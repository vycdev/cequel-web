import Markdown from "react-markdown";

export default (markdown: string) => {
    return (
        <div id="markdownBox">
            <Markdown>{markdown}</Markdown>
        </div>
    );
}
