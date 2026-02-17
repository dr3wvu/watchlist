import { inngest } from "@/lib/inngest/client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
import { getWatchlistSymbols } from "../actions/watchlist.action";
import { getAllUsersForNews } from "@/lib/actions/user.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    const { email, name, country, investmentGoals, riskTolerance } = event.data;

    const introText = `
Welcome to Watchlist, ${name}! 🎉

You're investing from ${country} with a ${riskTolerance} risk tolerance and a focus on ${investmentGoals}. 
We're excited to help you track the markets and make smarter moves.
`;
    // try {
    //   const response = await step.ai.infer("generate-welcome-intro", {
    //     model: step.ai.models.gemini({ model: "gemini-2.0-flash" }),
    //     body: {
    //       contents: [
    //         {
    //           role: "user",
    //           parts: [{ text: prompt }],
    //         },
    //       ],
    //     },
    //   });

    //   const part = response.candidates?.[0]?.content?.parts?.[0];

    //   if (part && "text" in part) {
    //     introText = part.text;
    //   }
    // } catch (err) {
    //   console.error("AI generation failed, using fallback:", err);
    //   // return {
    //   //   success: false,
    //   //   message: "failed to send",
    //   // };
    // }

    await step.run("send-welcome-email", async () => {
      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  },
);

export const sendDailyNewsSummary = inngest.createFunction(
  { id: "daily-news-summary" },
  [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }], // format: min hour dayofMonth month dayofweek
  async ({ step }) => {
    // Step #1: Get all users for news delivery
    const users = await step.run("get-all-users", getAllUsersForNews);

    if (!users || users.length === 0) {
      return { success: false, message: "No users found" };
    }

    // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{
        user: any;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users as any[]) {
        try {
          const symbols = await getWatchlistSymbols(user.email);
          let articles = await getNews(symbols);
          // Enforce max 6 articles per user
          articles = (articles || []).slice(0, 6);
          // If still empty, fallback to general
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error("daily-news: error preparing user news", user.email, e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    // Step #3: (placeholder) Summarize news via AI
    const userNewsSummaries: {
      user: any;
      newsContent: string | null;
    }[] = [];

    for (const { user, articles } of results) {
      try {
        const newsContent = formatArticlesForEmail(articles);
        userNewsSummaries.push({ user, newsContent });
      } catch (err) {
        console.error(`Failed to summarize news for ${user.email}:`, err);
        userNewsSummaries.push({
          user,
          newsContent: "No market news available.",
        });
      }
    }

    // Step #4: (placeholder) Send the emails
    await step.run("send-news-emails", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return await sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        }),
      );
    });

    return {
      success: true,
      message: "Daily news summary emails sent successfully",
    };
  },
);

export function formatArticlesForEmail(articles: any[]): string {
  if (!articles || articles.length === 0) {
    return `
      <p style="color:#CCDADC; font-size:14px;">
        No market news available today.
      </p>
    `;
  }

  return articles.slice(0, 6).map(formatArticleContent).join("");
}

function formatArticleContent(article: any): string {
  if (!article) {
    return "";
  }

  const headline = article.headline || "Market Update";
  const content =
    article.summary || article.description || "No details available.";

  const source = article.source || "";
  const date = article.datetime
    ? new Date(article.datetime).toLocaleDateString()
    : "";

  const url = article.url || article.link || null;

  return `
    <div style="margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid #30333A;">
      
      <!-- Headline -->
      <p style="
        margin:0 0 6px 0;
        font-size:16px;
        font-weight:600;
        color:#ffffff;
        line-height:1.4;
      ">
        ${headline}
      </p>

      <!-- Source + Date -->
      <p style="
        margin:0 0 10px 0;
        font-size:12px;
        color:#6b7280;
      ">
        ${source}${source && date ? " • " : ""}${date}
      </p>

      <!-- Article Content -->
      <p style="
        margin:0;
        font-size:14px;
        color:#CCDADC;
        line-height:1.6;
      ">
        ${content}
      </p>

      ${
        url
          ? `
        <p style="margin:10px 0 0 0;">
          <a href="${url}" style="
            color:#FDD458;
            text-decoration:none;
            font-size:14px;
            font-weight:500;
          ">
            Read full article →
          </a>
        </p>
      `
          : ""
      }
    </div>
  `;
}
