import { Breakdown } from "./Breakdown";

/**
 * Summary of Copilot usage.
 */

export interface CopilotUsageData {
    /**
     * Breakdown of Copilot code completions usage by language and editor
     */
    breakdown: Breakdown[] | null;
    /**
     * The date for which the usage metrics are reported, in `YYYY-MM-DD` format.
     */
    day: Date;
    /**
     * The total number of Copilot code completion suggestions accepted by users.
     */
    total_acceptances_count?: number;
    /**
     * The total number of users who interacted with Copilot Chat in the IDE during the day
     * specified.
     */
    total_active_chat_users?: number;
    /**
     * The total number of users who were shown Copilot code completion suggestions during the
     * day specified.
     */
    total_active_users?: number;
    /**
     * The total instances of users who accepted code suggested by Copilot Chat in the IDE
     * (panel and inline).
     */
    total_chat_acceptances?: number;
    /**
     * The total number of chat turns (prompt and response pairs) sent between users and Copilot
     * Chat in the IDE.
     */
    total_chat_turns?: number;
    /**
     * The total number of lines of code completions accepted by users.
     */
    total_lines_accepted?: number;
    /**
     * The total number of lines of code completions suggested by Copilot.
     */
    total_lines_suggested?: number;
    /**
     * The total number of Copilot code completion suggestions shown to users.
     */
    total_suggestions_count?: number;
}
