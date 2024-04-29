/**
 * Breakdown of Copilot usage by editor for this language
 */

export interface Breakdown {
    /**
     * The number of Copilot suggestions accepted by users in the editor specified during the
     * day specified.
     */
    acceptances_count?: number;
    /**
     * The number of users who were shown Copilot completion suggestions in the editor specified
     * during the day specified.
     */
    active_users?: number;
    /**
     * The editor in which Copilot suggestions were shown to users for the specified language.
     */
    editor: string;
    /**
     * The language in which Copilot suggestions were shown to users in the specified editor.
     */
    language?: string;
    /**
     * The number of lines of code accepted by users in the editor specified during the day
     * specified.
     */
    lines_accepted?: number;
    /**
     * The number of lines of code suggested by Copilot in the editor specified during the day
     * specified.
     */
    lines_suggested?: number;
    /**
     * The number of Copilot suggestions shown to users in the editor specified during the day
     * specified.
     */
    suggestions_count?: number;
}
