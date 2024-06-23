import CodeEditor from "../components/CodeEditor"
import ContentBox from "../components/ContentBox";

const markdown = 
`# Welcome to InfoIntensive!
##### No more writing code on paper!

**InfoIntensive** is a platform designed for first-year high school students studying informatics. Here, you can explore and practice writing pseudocode, and solve exercises similar to those found in the BAC exam. The purpose is to help you understand the basics of programming logic, but also provide you an easy to use tool for writing and executing the pseudocode taught in the romanian high school curriculum.

##### Getting Started
1. **Write Your Code**: Use the editor on the right to write your pseudocode.
2. **Run Your Code**: Click the 'Run' button to execute your code and see the results.
3. **Language Features**: If you want to learn more about the language features, check out the [Docs](/docs) page.

##### Restrictions
Unfortuantely, to avoid overloading the platform, we have set some restrictions in place:
- **If you do not have an account**: The editor is limited to 500 characters per run, as well as a maximum execution time of 0.5 seconds.
- **If you have an account**: The editor is limited to 2000 characters per run, as well as a maximum execution time of 5 second.

##### Run locally
If you want to run your code locally avoiding the restriction of the online editor, you can set up your own project using the 
[Interpreter Library](https://github.com/InfoIntensive/interpreter-lib) and 
[Executable Project](https://github.com/InfoIntensive/interpreter-exec)

##### \`Happy coding!\`
`

const Home = () => {
    return <div id="homeWrapper">
        <div className="contentBoxWrapper">
            <ContentBox>{markdown}</ContentBox>
        </div>
        <div className="codeEditorWrapper">
            <CodeEditor />
        </div>
    </div>;
};

export default Home;