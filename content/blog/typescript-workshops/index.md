---
title: TypeScript
date: "2019-11-22"
description: "Typescript is THE tool"
---

- **[What do you know that makes you think you can actually write and teach about TypeScript?]()**
- **[Compile time, build time, run time and... author time]()**
- **[Static types - the thing that draw developer's attention]()**
- **[Benefits]()**
- **[Caveats]()**


### What do you know that makes you think you can actually write about and teach TypeScript?

I've been working with very different programming languages over the years. From some of them you would expect to receive incredible help from compiler, from others, well, significantly less help and sometimes you might be thinking the language itself is being obnoxios.

I've been working in the following setups:

- TypeScript
- JavaScript with proptypes
- JavaScript with Flow
- rewriting JavaScript to TypeScript (or I should say "adding types" since JS was already quite similar to TS back then)
- teaching TypeScript to seasoned JS developers

Interestingly, I had first started with TypeScript before I moved to JavaScript. Which then occured to be quite popular way of entering JS world for people whose prior experience focuses on strongly typed languages like Java (for Android in my case).

https://twitter.com/cszhu/status/1169859162047574016?s=20

I'm being rude I know, but let's face the fact: JavaScript leaves a lot to be desired. While we cannot have everything, we can try make the world a better place by being more careful and considering thoroughly the tooling we choose.

I believe that a good developer experience happens when:

- concepts can be expressed in a concise manner without too many boilerplate
- the code is unambigious and expressive
- newcomers are welcomed with self documented code
- the code is focused on data transformation rather than data obfuscation
- a compiler or IDE helps you writes quality code without

TypeScript is here to help you achieve some of these ^ namely:

- code becomes less ambigiuos, thanks to having strickly defined types
- code is more self documented which helps newcomers to get into the project, but also to get back after some time and still be albo to understand what is happening

> The thing that I believe would make software developmnet in JavaScript better is having strong and static type system.

### Compile time, build time, run time and... author time



### Type safety - the thing that draws developer's attention

TypeScript has a different approach to typing. It's basically about _static and dynamic_.

By and large, it's the subject of discussion which approach is better, but most of developers would agree that for some programming langagues design it's more appropriate to have one approach than the other. So, _it depends_. The current trend is to rather have strong, static types.

Simply put, static type checking means that types are being checking on compile time, not during the exection of the program (which can basically cause the indisgraceful crash). It's simply too late, and a developer mind in unreliable from time to time. The information that the program has bugs comes later than it would if it had types checking on a daily basis, or at least a build pipeline.

But TypeScript type system can be described more detailed than just that.

![](./typescript-google.png)

- gradual
- duck
- structural

#### Gradual

It means that TypeScript allows you to add types to your existing JS codebase step by step. Or it is possible to use types only where you feel like it's approriate.

#### Duck and structural

JavaScript type system can be described as being _duck typed_ which means that the type checking is basically checking if in the particular runtime situation an object has particular properties or behaviors. Like in the example:

```jsx
const gimmeName = somebody => somebody.name
const performWork = somebody => somebody.work()

const person = {
    name: "John", 
    walk: () => console.log("walking"),
}

const employee = {
    name: "Bart", 
    work: () => console.log("working"),
}

gimmeName(employee)
// Bart
gimmeName(person)
// John

performWork(employee)
// working
performWork(person)
// ERROR undefined is not a function
```

As long as an object has a property a function wants to use, it's an object of the proper type. 
Fot _gimmeName_ an object needs to have _name_, and for _performWork_ a function _work_. That's it.

> If it walks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

TypeScript allows you to expect the same, but it will verify it at compile-time and this feature of a language is called the structural subtyping.


```jsx
const gimmeName = (somebody: Person) => console.log(somebody.name)

interface Person {
    name: string, 
}

interface Employee {
    name: string, 
    work: () => void
}

const person: Person = {
    name: "John", 
}

const employee: Employee = {
    name: "Bart", 
    work: () => console.log("working hard")
}

gimmeName(person)
// John
gimmeName(employee) // <-- it doesn't complain
// Bart

```

The compiler won't complain when _gimmeName_ is invoked with an object of the _Employee_ type. The compiler is just interested in the fact that the _Employee_ has all the fields that _Person_ has. _Employee_ might have additional fields (like _work_) but if _Person_ has a field that is missing in _Employee_, compiler will return an error


```jsx
const gimmeName = (somebody: Person) => console.log(somebody.name)

interface Person {
    name: String, 
    walk: () => void
}

interface Employee {
    name: String, 
    work: () => void
}

const person: Person = {
    name: "John", 
    walk: () => {}
}

const employee: Employee = {
    name: "Bart", 
    work: () => {}
}

gimmeName(employee)
```

>Argument of type 'Employee' is not assignable to parameter of type 'Person'.
>Property 'walk' is missing in type 'Employee' but required in type 'Person'.(2345)

That's basically how structural and duck typing work.

