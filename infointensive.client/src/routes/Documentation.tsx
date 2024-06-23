import ContentBox from "../components/ContentBox"

const markdown =
`# Documentation
### Introduction
**InfoIntensive** is a platform designed for first-year high school students studying informatics. Here, you can explore and practice writing pseudocode, and solve exercises similar to those found in the BAC exam. The purpose is to help you understand the basics of programming logic, but also provide you an easy to use tool for writing and executing the pseudocode taught in the romanian high school curriculum.

### The language
Psudocode is a high-level description of a computer program or algorithm, that uses the structural conventions of a programming language, but is intended for human reading rather than machine reading. Pseudocode typically omits details that are not essential for human understanding of the algorithm, such as variable declarations, system-specific code and some subroutines.

Psudocode algorithms can contain sequences described in natural language as well as compact mathematical expressions which are missing from real programming languages.

The concepts that are used in pseudocde are similar to those of real programming lanugages, such as:
- **Instructions**: used to perform actions
- **Variables**: used to store data
- **Constants**: used to store fixed values
- **Operators**: used to perform operations
- **Expressions**: used to combine variables, constants and operators

There are multiple variants of the pseudocode language, but the one used in **InfoIntensive** is based on the romanian high school curriculum. The language is simple and easy to understand, but also powerful enough to allow you to write complex algorithms.

The website allows for two different languages to write pseudocode in: \`Romanian\` and \`English\`. The language can be changed in the code editor and it defaults to English.


### Variables and constants

In pseudocde, variables are not declared and their name respects the regular usage of indentifiers in programming languages - they start with a letter and can contain letters and digits. The variables can store values of different types, such as numbers or strings.

Constants that appear in the code as fixed values are literals. They are used to store values that do not change during the execution of the program such as numerical values which can be real or integer numbers, or strings.

For example, the following code snippet declares a variable and contains a literal:

\`\`\`
// Declare a variable
num1 = 10
str1 = "Hello"

// Use a literal
write 20
write "Hello"
\`\`\`


### Operators
The pseudocode language that is used in **InfoIntensive** supports all of the usual arithmetic and boolean operators. The arithmetic operators are used to perform mathematical operations, while the boolean operators are used to perform logical operations.

#### Arithmetic operators
 - \`+\`: addition
 - \`-\`: subtraction
 - \`*\`: multiplication
 - \`/\`: division
 - \`%\`: modulo
 - \`^2\`: power of 2

`

export default () => {

    return <div id="docsPageWrapper">
        <div className="contentBoxWrapper">
            <ContentBox>{markdown}</ContentBox>
        </div>
    </div>
}   