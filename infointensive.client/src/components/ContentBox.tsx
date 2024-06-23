import Markdown from "react-markdown";

export default ({ children }) => {
    return (
        <div className="contentBox">
            <Markdown>{children}</Markdown>
        </div>
    );
}
