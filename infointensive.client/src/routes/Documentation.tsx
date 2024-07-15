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
The pseudocode language used in **InfoIntensive** supports a variety of arithmetic, comparison, logical, and bitwise operators. These operators are essential for performing mathematical computations, logical evaluations, and bit-level operations.

#### Arithmetic operators
 - \`+ \`: addition (e.g., \`a + b\`)
 - \`- \`: subtraction (e.g., \`a - b\`)
 - \`* \`: multiplication (e.g., \`a * b\`)
 - \`/ \`: division (e.g., \`a / b\`)
 - \`% \`: modulo (e.g., \`a % b\`)
 - \`^ \`: exponentiation (e.g., \`a ^ b\`)

#### Grouping operators
 - \`(\`: start of a group (e.g., \`(a + b)\`)
 - \`)\`: end of a group (e.g., \`a + b)\`)
 - \`[]\`: integer part of a number or expression (e.g., \`[a]\`)

#### Comparison operators
 - \`= \`: equal to (e.g., \`a = b\`)
 - \`!= \`: not equal to (e.g., \`a != b\`)
 - \`< \`: less than (e.g., \`a < b\`)
 - \`> \`: greater than (e.g., \`a > b\`)
 - \`<= \`: less than or equal to (e.g., \`a <= b\`)
 - \`>= \`: greater than or equal to (e.g., \`a >= b\`)

#### Logical operators
 - \`&&\`: logical AND (e.g., \`a && b\`)
 - \`||\`: logical OR (e.g., \`a || b\`)
 - \`!\`: logical NOT (e.g., \`!a\`)

#### Bitwise operators
 - \`& \`: bitwise AND (e.g., \`a & b\`)
 - \`| \`: bitwise OR (e.g., \`a | b\`)
 - \`^ \`: bitwise XOR (e.g., \`a ^ b\`)
 - \`~\`: bitwise NOT (e.g., \`~a\`)
 - \`<< \`: bitwise left shift (e.g., \`a << b\`)
 - \`>> \`: bitwise right shift (e.g., \`a >> b\`)

### Instructions
The pseudocode language used in **InfoIntensive** provides various control flow structures to handle conditional logic and looping. Below are the descriptions and examples of these instructions.

#### Conditional Statements
Conditional statements allow the execution of instructions based on the evaluation of an expression.

- **if-else statement**
  Evaluates an expression and executes one set of instructions if the expression is true and another set if it is false.

  \`\`\`plaintext
  if <expression> then
      <instruction 1>
  else
      <instruction 2>
  \`\`\`

  **Example:**

  \`\`\`plaintext
  if x > 0 then
      print("Positive number")
  else
      print("Non-positive number")
  \`\`\`

#### Looping Statements
Looping statements allow the execution of a set of instructions multiple times based on the evaluation of expressions.

- **for loop**
  Iterates over a range of values. The range is defined by an initial assignation and two expressions.

  \`\`\`plaintext
  for <assignation>, <expression>, <expression> do
      <instruction>
  \`\`\`

  **Example:**

  \`\`\`plaintext
  for i = 1, i <= 10, i = i + 1 do
      print(i)
  \`\`\`

- **while loop**
  Executes a set of instructions as long as an expression evaluates to true.

  \`\`\`plaintext
  while <expression> do
      <instruction>
  \`\`\`

  **Example:**

  \`\`\`plaintext
  while x < 100 do
      x = x * 2
  \`\`\`

- **do-while loop**
  Executes a set of instructions at least once, then continues to execute them as long as an expression evaluates to true.

  \`\`\`plaintext
  do
      <instruction>
  while <expression>
  \`\`\`

  **Example:**

  \`\`\`plaintext
  do
      x = x - 1
  while x > 0
  \`\`\`

- **repeat-until loop**
  Executes a set of instructions at least once, then continues to execute them until an expression evaluates to true.

  \`\`\`plaintext
  repeat
      <instruction>
  until <expression>
  \`\`\`

  **Example:**

  \`\`\`plaintext
  repeat
      x = x + 1
  until x == 10
  \`\`\`

#### Notes on Indentation
In this pseudocode language, indentation is significant and determines the scope of loops and conditional statements. Ensure that each block of code within these structures is properly indented to avoid logical errors.

`

export default () => {

    return <div id="docsPageWrapper">
        <div className="contentBoxWrapper">
            <ContentBox>{markdown}</ContentBox>
        </div>
    </div>
}   