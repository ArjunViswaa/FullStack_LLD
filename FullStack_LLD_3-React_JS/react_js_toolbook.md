# React JS Toolbook

## Table of Contents

1. [Introduction](#introduction)
2. [React Fundamentals](#react-fundamentals)
   - [What is React?](#what-is-react)
   - [JSX](#jsx)
   - [Components](#components)
   - [Rendering and Lifecycle](#rendering-and-lifecycle)
   - [Events](#events)
   - [Forms](#forms)
3. [Advanced React Concepts](#advanced-react-concepts)
   - [Context API](#context-api)
   - [Code Splitting](#code-splitting)
   - [Error Boundaries](#error-boundaries)
   - [Higher-Order Components](#higher-order-components)
   - [Render Props](#render-props)
   - [Performance Optimization](#performance-optimization)
4. [React Hooks](#react-hooks)
   - [Introduction to Hooks](#introduction-to-hooks)
   - [useState](#usestate)
   - [useEffect](#useeffect)
   - [useContext](#usecontext)
   - [useRef](#useref)
   - [useMemo and useCallback](#usememo-and-usecallback)
   - [useReducer](#usereducer)
5. [React Ecosystem and Tools](#react-ecosystem-and-tools)
   - [State Management Libraries](#state-management-libraries)
   - [Routing](#routing)
   - [Form Handling](#form-handling)
   - [UI Component Libraries](#ui-component-libraries)
   - [Data Fetching](#data-fetching)
   - [Testing Libraries](#testing-libraries)
   - [Build Tools and Bundlers](#build-tools-and-bundlers)
   - [Developer Tools](#developer-tools)
   - [Styling Solutions](#styling-solutions)
   - [Animation Libraries](#animation-libraries)
   - [Server-Side Rendering and Static Site Generation](#server-side-rendering-and-static-site-generation)
   - [Mobile Development](#mobile-development)
6. [React Best Practices](#react-best-practices)
   - [Component Structure and Organization](#component-structure-and-organization)
   - [State Management](#state-management)
   - [Performance Optimization](#performance-optimization-1)
   - [Hooks Usage](#hooks-usage)
   - [Props Handling](#props-handling)
   - [Error Handling](#error-handling)
   - [Testing](#testing)
   - [Accessibility](#accessibility)
   - [Code Style and Formatting](#code-style-and-formatting)
   - [Security](#security)
   - [Performance Monitoring](#performance-monitoring)
   - [Deployment and Build Optimization](#deployment-and-build-optimization)
   - [Documentation](#documentation)
7. [Interview Preparation Tips](#interview-preparation-tips)
   - [Common React Interview Questions](#common-react-interview-questions)
   - [Coding Challenges](#coding-challenges)
   - [System Design with React](#system-design-with-react)
8. [Conclusion](#conclusion)
9. [References](#references)

## Introduction

This comprehensive React JS Toolbook is designed to serve as a complete reference guide for React developers, particularly those preparing for technical interviews. It covers everything from fundamental concepts to advanced techniques, best practices, and the broader React ecosystem.

React has revolutionized the way we build user interfaces on the web. Created by Facebook in 2013, it has grown to become one of the most popular JavaScript libraries for building user interfaces. Its component-based architecture, virtual DOM implementation, and declarative approach to UI development have made it a favorite among developers worldwide.

This toolbook aims to provide you with a deep understanding of React's core concepts, advanced patterns, and the ecosystem surrounding it. Whether you're preparing for a technical interview, looking to improve your React skills, or just getting started with React, this guide will serve as a valuable resource.

Let's begin our journey through the React ecosystem, starting with the fundamentals and gradually moving to more advanced topics.

# React JS: Advanced Concepts - Higher-Order Components (HOCs)

Higher-Order Components (HOCs) are an advanced pattern in React for reusing component logic. A higher-order component is a function that takes a component and returns a new component with additional props or behavior.

## Understanding Higher-Order Components

The HOC pattern stems from a fundamental principle in functional programming: composition. Instead of modifying a component directly, HOCs compose the original component by wrapping it in a container component.

```jsx
// This is a higher-order component
function withExtraProps(WrappedComponent) {
  // Returns a new component
  return function EnhancedComponent(props) {
    // Returns the wrapped component with extra props
    return <WrappedComponent extraProp="value" {...props} />;
  };
}

// Usage
const EnhancedComponent = withExtraProps(MyComponent);
```

## Why Use Higher-Order Components?

HOCs solve several common problems in React development:

1. **Code Reuse**: Extract common functionality into reusable pieces
2. **Cross-Cutting Concerns**: Handle aspects like logging, authentication, or data fetching that affect multiple components
3. **Props Manipulation**: Transform, add, or remove props before they reach a component
4. **State Abstraction**: Abstract away complex state management from presentation components
5. **Render Hijacking**: Control what gets rendered by a component

## Common Use Cases for HOCs

### 1. Adding Authentication

```jsx
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { isAuthenticated, user } = useAuth(); // Custom hook for auth state
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    return <WrappedComponent user={user} {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### 2. Data Fetching

```jsx
function withData(WrappedComponent, dataSource) {
  return function WithData(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await dataSource();
          setData(result);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }, []);
    
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    
    return <WrappedComponent data={data} {...props} />;
  };
}

// Usage
const fetchUsers = () => fetch('/api/users').then(res => res.json());
const UserListWithData = withData(UserList, fetchUsers);
```

### 3. Logging and Analytics

```jsx
function withTracking(WrappedComponent, trackingId) {
  return function WithTracking(props) {
    useEffect(() => {
      // Log component mount
      analytics.trackEvent(`${trackingId}_viewed`);
      
      return () => {
        // Log component unmount
        analytics.trackEvent(`${trackingId}_closed`);
      };
    }, []);
    
    const trackEvent = (eventName) => {
      analytics.trackEvent(`${trackingId}_${eventName}`);
    };
    
    return <WrappedComponent trackEvent={trackEvent} {...props} />;
  };
}

// Usage
const TrackedCheckout = withTracking(CheckoutForm, 'checkout');
```

### 4. Style Injection

```jsx
function withTheme(WrappedComponent) {
  return function WithTheme(props) {
    const theme = useContext(ThemeContext);
    
    return <WrappedComponent theme={theme} {...props} />;
  };
}

// Usage
const ThemedButton = withTheme(Button);
```

## Implementing HOCs Correctly

### 1. Don't Mutate the Original Component

```jsx
// Wrong
function withExtraProps(WrappedComponent) {
  WrappedComponent.extraProp = 'value'; // Mutation!
  return WrappedComponent;
}

// Correct
function withExtraProps(WrappedComponent) {
  return function(props) {
    return <WrappedComponent extraProp="value" {...props} />;
  };
}
```

### 2. Pass Unrelated Props Through

```jsx
function withAuth(WrappedComponent) {
  return function(props) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    // Pass through all props
    return <WrappedComponent {...props} />;
  };
}
```

### 3. Maintain Ref Forwarding

```jsx
function withStyles(WrappedComponent) {
  // Use React.forwardRef to pass refs through
  return React.forwardRef((props, ref) => {
    const style = { margin: 20, padding: 20 };
    
    return <WrappedComponent style={style} ref={ref} {...props} />;
  });
}
```

### 4. Use Meaningful Display Names

```jsx
function withAuth(WrappedComponent) {
  function WithAuth(props) {
    // ...implementation
  }
  
  // Set a display name for better debugging
  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  
  return WithAuth;
}

// Helper function to get display name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## Composing Multiple HOCs

You can compose multiple HOCs together to add several layers of functionality:

```jsx
// Compose multiple HOCs
const EnhancedComponent = withAuth(withData(withTheme(MyComponent)));

// Or using a compose utility
const enhance = compose(
  withAuth,
  withData,
  withTheme
);
const EnhancedComponent = enhance(MyComponent);
```

A simple compose utility can be implemented as:

```jsx
function compose(...funcs) {
  return funcs.reduce(
    (a, b) => (...args) => a(b(...args)),
    arg => arg
  );
}
```

## HOCs vs. Hooks

With the introduction of Hooks in React 16.8, many use cases for HOCs can now be handled with custom hooks. Here's a comparison:

### HOC Approach

```jsx
// HOC for data fetching
function withData(WrappedComponent, dataSource) {
  return function(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      dataSource().then(result => {
        setData(result);
        setLoading(false);
      });
    }, []);
    
    return (
      <WrappedComponent 
        data={data} 
        loading={loading} 
        {...props} 
      />
    );
  };
}

// Usage
const UserListWithData = withData(UserList, fetchUsers);
```

### Hook Approach

```jsx
// Custom hook for data fetching
function useData(dataSource) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    dataSource().then(result => {
      setData(result);
      setLoading(false);
    });
  }, [dataSource]);
  
  return { data, loading };
}

// Usage
function UserList(props) {
  const { data, loading } = useData(fetchUsers);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### When to Use HOCs vs. Hooks

- **Use Hooks when**:
  - You need to reuse stateful logic without changing component hierarchy
  - You want to avoid wrapper hell (deeply nested components from multiple HOCs)
  - You prefer function components and a more direct API

- **Use HOCs when**:
  - You need to wrap components, including class components
  - You want to transform props or abstract away complex logic
  - You need to control the rendering process of a component

## Best Practices for HOCs

1. **Use Composition**: Compose multiple HOCs rather than creating monolithic ones.

2. **Keep HOCs Pure**: HOCs should be pure functions without side effects.

3. **Don't Use HOCs Inside the Render Method**: Apply HOCs outside the component definition to avoid recreation on each render.

```jsx
// Wrong
function MyComponent(props) {
  // This creates a new EnhancedComponent on every render
  const EnhancedComponent = withAuth(MyInnerComponent);
  return <EnhancedComponent />;
}

// Correct
const EnhancedComponent = withAuth(MyInnerComponent);
function MyComponent(props) {
  return <EnhancedComponent />;
}
```

4. **Copy Static Methods**: If the wrapped component has static methods, make sure to copy them to the enhanced component.

```jsx
function withAuth(WrappedComponent) {
  function WithAuth(props) {
    // Implementation
  }
  
  // Copy static methods
  hoistNonReactStatics(WithAuth, WrappedComponent);
  
  return WithAuth;
}
```

5. **Handle Ref Forwarding**: Use `React.forwardRef` to ensure refs are properly passed through.

6. **Consider Alternatives**: With the introduction of Hooks and the Context API, evaluate whether HOCs are the best solution for your use case.

Higher-Order Components remain a powerful pattern in React, especially for cross-cutting concerns and when working with class components. While Hooks provide an alternative for many use cases, understanding HOCs is still valuable for React developers, particularly when working with existing codebases or complex component enhancement scenarios.
# React JS: Advanced Concepts - Render Props

Render Props is an advanced pattern in React that involves passing a function as a prop to a component, which the component then calls to determine what to render. This technique provides a powerful way to share code between React components using a prop whose value is a function.

## Understanding Render Props

The term "render prop" refers to a technique for sharing code between React components using a prop whose value is a function. The component with the render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

In this example, `DataProvider` is a component that takes a function as its `render` prop. It will call this function with some data, and the function will return the React elements to be rendered.

## Why Use Render Props?

Render Props solve several common problems in React development:

1. **Code Reuse**: Share code between components without inheritance
2. **Inversion of Control**: Give the parent component control over what gets rendered
3. **Separation of Concerns**: Separate data fetching/state management from presentation
4. **Composition**: Compose components in a flexible way
5. **Avoid Prop Drilling**: Pass data to deeply nested components without intermediate props

## Basic Implementation of Render Props

Here's a simple example of a component that uses the render props pattern:

```jsx
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div 
        style={{ height: '100vh' }} 
        onMouseMove={this.handleMouseMove}
      >
        {/* Call the render prop function with the state */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <Mouse render={mouse => (
      <p>The mouse position is {mouse.x}, {mouse.y}</p>
    )}/>
  );
}
```

## Common Use Cases for Render Props

### 1. Sharing Mouse Position

```jsx
function MouseTracker() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      <Mouse render={mouse => (
        <p>The mouse position is {mouse.x}, {mouse.y}</p>
      )}/>
    </div>
  );
}
```

### 2. Data Fetching

```jsx
class DataFetcher extends React.Component {
  state = {
    data: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(this.props.url);
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    return this.props.render({
      data: this.state.data,
      loading: this.state.loading,
      error: this.state.error,
      refetch: this.fetchData
    });
  }
}

// Usage
function UserProfile({ userId }) {
  return (
    <DataFetcher 
      url={`/api/users/${userId}`}
      render={({ data, loading, error, refetch }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        
        return (
          <div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
            <button onClick={refetch}>Refresh</button>
          </div>
        );
      }}
    />
  );
}
```

### 3. Form Handling

```jsx
class Form extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {}
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }), () => {
      if (this.props.validate) {
        const errors = this.props.validate(this.state.values);
        this.setState({ errors });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values);
    }
  };

  render() {
    return this.props.render({
      values: this.state.values,
      touched: this.state.touched,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    });
  }
}

// Usage
function LoginForm() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const handleSubmit = (values) => {
    console.log('Submitting', values);
    // Submit to server
  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={handleSubmit}
      render={({ values, touched, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    />
  );
}
```

## Variations of the Render Props Pattern

### 1. Using Children as a Function

Instead of using a prop called `render`, you can use the `children` prop as a function:

```jsx
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <Mouse>
      {mouse => (
        <p>The mouse position is {mouse.x}, {mouse.y}</p>
      )}
    </Mouse>
  );
}
```

This approach can make the code more readable, especially when the render function is complex.

### 2. Using a Component Prop

Another variation is to pass a component as a prop:

```jsx
function DataFetcher({ url, component: Component, ...rest }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return <Component data={data} loading={loading} error={error} {...rest} />;
}

// Usage
function UserList({ data, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return <DataFetcher url="/api/users" component={UserList} />;
}
```

## Render Props vs. Higher-Order Components

Render Props and Higher-Order Components (HOCs) are both patterns for code reuse in React. Here's a comparison:

### Same Functionality with Different Patterns

**HOC Approach:**
```jsx
// HOC
function withMouse(WrappedComponent) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };

    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
          <WrappedComponent mouse={this.state} {...this.props} />
        </div>
      );
    }
  };
}

// Usage
const MouseTracker = withMouse(({ mouse }) => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
));
```

**Render Props Approach:**
```jsx
// Render Prop Component
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <Mouse render={mouse => (
      <p>The mouse position is {mouse.x}, {mouse.y}</p>
    )}/>
  );
}
```

### When to Use Render Props vs. HOCs

- **Use Render Props when**:
  - You want more explicit composition
  - You want to avoid the naming collisions that can happen with HOCs
  - You want to make the data flow more obvious
  - You need more flexibility in how components are composed

- **Use HOCs when**:
  - You want to transform props
  - You want to abstract away complex logic
  - You need to wrap components, including class components
  - You want to compose multiple enhancers

## Render Props with Hooks

With the introduction of Hooks, many use cases for render props can now be handled with custom hooks:

**Render Props Approach:**
```jsx
function MouseTracker() {
  return (
    <Mouse render={mouse => (
      <p>The mouse position is {mouse.x}, {mouse.y}</p>
    )}/>
  );
}
```

**Hooks Approach:**
```jsx
function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return mouse;
}

function MouseTracker() {
  const mouse = useMouse();
  return <p>The mouse position is {mouse.x}, {mouse.y}</p>;
}
```

## Best Practices for Render Props

1. **Avoid Inline Functions in Render**: Creating functions inside render can lead to unnecessary re-renders. Consider defining the render function outside the render method or component.

```jsx
// Better approach
const renderMousePosition = mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
);

function App() {
  return <Mouse render={renderMousePosition} />;
}
```

2. **Use Memoization**: If you must define the render function inline, consider using `React.memo` or `useMemo` to prevent unnecessary re-renders.

```jsx
function ParentComponent() {
  // Memoize the render function
  const renderMouse = useMemo(() => {
    return mouse => <p>The mouse position is {mouse.x}, {mouse.y}</p>;
  }, []);
  
  return <Mouse render={renderMouse} />;
}
```

3. **Consider Component Composition**: Sometimes, simple component composition can be clearer than render props.

```jsx
// Instead of
<DataProvider render={data => <MyComponent data={data} />} />

// Consider
<DataProvider>
  {data => <MyComponent data={data} />}
</DataProvider>

// Or even
<DataProvider>
  <MyComponent />
</DataProvider>
```

4. **Be Mindful of Performance**: Render props can sometimes lead to deeper component trees, which might affect performance. Profile your application and optimize as needed.

5. **Consider Alternatives**: With Hooks, many use cases for render props can be simplified. Evaluate whether Hooks might provide a cleaner solution for your specific case.

Render Props remain a powerful pattern in React, especially for sharing stateful logic between components. While Hooks provide an alternative for many use cases, understanding render props is still valuable for React developers, particularly when working with existing codebases or when you need the flexibility that render props provide.
# React JS: Advanced Concepts - Performance Optimization

Performance optimization is crucial for building responsive and efficient React applications. This section covers various techniques and best practices to optimize React applications for better performance.

## Understanding React's Rendering Process

Before diving into optimization techniques, it's important to understand how React renders components:

1. **Render Phase**: React creates a virtual representation of the UI (Virtual DOM)
2. **Reconciliation**: React compares the new Virtual DOM with the previous one
3. **Commit Phase**: React applies the necessary changes to the actual DOM

Performance optimizations in React typically focus on:
- Minimizing unnecessary renders
- Reducing the cost of renders when they do happen
- Optimizing resource usage

## Key Performance Optimization Techniques

### 1. Memoization with React.memo

`React.memo` is a higher-order component that memoizes the result of a component render. It prevents unnecessary re-renders when props haven't changed.

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
});
```

By default, `React.memo` performs a shallow comparison of props. You can provide a custom comparison function as the second argument:

```jsx
function areEqual(prevProps, nextProps) {
  // Return true if passing nextProps to render would return
  // the same result as passing prevProps to render,
  // otherwise return false
  return prevProps.title === nextProps.title && 
         prevProps.description === nextProps.description;
}

const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}, areEqual);
```

### 2. Using useMemo and useCallback Hooks

#### useMemo

`useMemo` memoizes the result of a computation, recalculating it only when one of its dependencies changes:

```jsx
import React, { useMemo } from 'react';

function ExpensiveComponent({ data, filter }) {
  // This calculation will only run when data or filter changes
  const filteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item => item.includes(filter));
  }, [data, filter]);
  
  return (
    <ul>
      {filteredData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

#### useCallback

`useCallback` returns a memoized version of a callback function that only changes if one of its dependencies changes:

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // This function is memoized and only changes when count changes
  const handleClick = useCallback(() => {
    console.log(`Button clicked, count: ${count}`);
  }, [count]);
  
  return <ChildComponent onClick={handleClick} />;
}

// Using React.memo to prevent unnecessary renders
const ChildComponent = React.memo(function ChildComponent({ onClick }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

### 3. Virtualization for Long Lists

When rendering long lists, virtualization can significantly improve performance by only rendering items that are currently visible in the viewport:

```jsx
import React from 'react';
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {index}: {items[index]}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

Libraries like `react-window` and `react-virtualized` provide components for efficiently rendering large lists and tabular data.

### 4. Code Splitting and Lazy Loading

Code splitting allows you to split your code into smaller chunks which can be loaded on demand:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 5. Avoiding Reconciliation with shouldComponentUpdate

In class components, you can implement `shouldComponentUpdate` to tell React when a component doesn't need to re-render:

```jsx
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
```

### 6. Using PureComponent for Class Components

`React.PureComponent` is similar to `React.Component` but implements `shouldComponentUpdate` with a shallow prop and state comparison:

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
```

### 7. Optimizing Context API Usage

Context API can cause re-renders in all consuming components when the context value changes. To optimize:

1. **Split contexts by domain**:

```jsx
// Instead of one large context
const AppContext = createContext();

// Split into smaller, focused contexts
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();
```

2. **Memoize context values**:

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Memoize the context value
  const value = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 8. Avoiding Inline Function Definitions

Inline functions in render methods create new function instances on each render, which can break memoization:

```jsx
// Avoid this
function MyComponent({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Better approach
function MyComponent({ items }) {
  const handleItemClick = useCallback((id) => {
    handleClick(id);
  }, []);
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### 9. Using Web Workers for CPU-Intensive Tasks

For CPU-intensive operations, you can use Web Workers to move the work off the main thread:

```jsx
import React, { useState, useEffect } from 'react';

function DataProcessor({ data }) {
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    const worker = new Worker('./worker.js');
    
    worker.onmessage = (e) => {
      setResult(e.data);
      worker.terminate();
    };
    
    worker.postMessage(data);
    
    return () => worker.terminate();
  }, [data]);
  
  return (
    <div>
      {result ? <ResultDisplay result={result} /> : <p>Processing...</p>}
    </div>
  );
}
```

And in `worker.js`:

```javascript
// worker.js
self.onmessage = (e) => {
  const data = e.data;
  const result = performExpensiveOperation(data);
  self.postMessage(result);
};

function performExpensiveOperation(data) {
  // CPU-intensive operation
  // ...
  return processedData;
}
```

## Measuring Performance

Before optimizing, it's important to measure performance to identify bottlenecks:

### 1. React DevTools Profiler

The React DevTools Profiler allows you to record and analyze component renders:

1. Install React DevTools browser extension
2. Open DevTools and go to the "Profiler" tab
3. Click "Record" and interact with your app
4. Analyze the results to identify components that render too often or take too long to render

### 2. Performance Timing API

You can use the browser's Performance API to measure specific operations:

```jsx
function ExpensiveComponent() {
  useEffect(() => {
    performance.mark('expensive-start');
    
    // Expensive operation
    const result = computeExpensiveValue();
    
    performance.mark('expensive-end');
    performance.measure(
      'expensive operation',
      'expensive-start',
      'expensive-end'
    );
    
    console.log(performance.getEntriesByName('expensive operation'));
  }, []);
  
  // ...
}
```

### 3. Lighthouse and WebPageTest

Use tools like Lighthouse and WebPageTest to measure overall application performance, including:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

## Common Performance Pitfalls

### 1. Rendering Large Lists Without Virtualization

**Problem**: Rendering thousands of items at once can freeze the UI.

**Solution**: Use virtualization libraries like `react-window` or `react-virtualized`.

### 2. Excessive Re-renders

**Problem**: Components re-rendering when they don't need to.

**Solution**: Use `React.memo`, `useMemo`, `useCallback`, and proper key props.

### 3. Large Bundle Sizes

**Problem**: Large JavaScript bundles increase load time and parsing time.

**Solution**: Use code splitting, tree shaking, and analyze your bundle with tools like `webpack-bundle-analyzer`.

### 4. Memory Leaks

**Problem**: Forgotten subscriptions or event listeners can cause memory leaks.

**Solution**: Clean up effects properly:

```jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]);
```

### 5. Expensive Calculations on Every Render

**Problem**: Performing expensive calculations on every render.

**Solution**: Use `useMemo` to memoize calculations.

## Best Practices for Performance Optimization

1. **Measure First**: Always measure performance before and after optimizations to ensure they're effective.

2. **Optimize the Critical Rendering Path**: Focus on components that render frequently or are in the critical path.

3. **Use Production Builds**: Development builds include extra warnings and are significantly slower.

4. **Implement Code Splitting**: Split your code based on routes and features.

5. **Memoize Appropriately**: Use memoization techniques but be aware of their memory cost.

6. **Virtualize Long Lists**: Always virtualize lists with more than a few dozen items.

7. **Optimize Images and Assets**: Use proper image formats, sizes, and loading strategies.

8. **Minimize State Updates**: Batch state updates and avoid unnecessary state changes.

9. **Use Web Workers for CPU-Intensive Tasks**: Move heavy computations off the main thread.

10. **Implement Progressive Loading**: Load the minimum required for initial render, then progressively load more.

By applying these performance optimization techniques, you can create React applications that are fast, responsive, and provide a great user experience even as they grow in complexity.
# React JS: Hooks - Introduction

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class. They allow you to "hook into" React state and lifecycle features from function components, making it possible to write more concise and readable code.

## Why Hooks Were Introduced

Before Hooks, React had two types of components:
1. **Function components**: Simple, stateless components that accept props and return React elements
2. **Class components**: More feature-rich components with state, lifecycle methods, and other capabilities

This created several challenges:

1. **Reusing stateful logic between components was difficult**. Patterns like higher-order components and render props emerged to solve this, but they made code harder to follow and led to "wrapper hell."

2. **Complex components became hard to understand**. Related code was split across different lifecycle methods, while unrelated code was often combined in the same method.

3. **Classes were confusing for both humans and machines**. They required understanding `this` in JavaScript, which works differently than in most languages. They also didn't minify well and made hot reloading less reliable.

Hooks solve these problems by:
- Allowing you to reuse stateful logic without changing your component hierarchy
- Letting you split components into smaller functions based on related pieces
- Enabling you to use React features without classes

## Rules of Hooks

Hooks come with two essential rules:

1. **Only call Hooks at the top level**. Don't call Hooks inside loops, conditions, or nested functions. This ensures that Hooks are called in the same order each time a component renders, which is crucial for React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls.

2. **Only call Hooks from React function components or custom Hooks**. Don't call Hooks from regular JavaScript functions or class components.

React provides an ESLint plugin called `eslint-plugin-react-hooks` that enforces these rules.

## Built-in Hooks Overview

React comes with several built-in Hooks:

### State Hooks
- **useState**: Adds state to function components
- **useReducer**: An alternative to useState for complex state logic

### Effect Hooks
- **useEffect**: Performs side effects in function components
- **useLayoutEffect**: Similar to useEffect, but fires synchronously after all DOM mutations

### Context Hooks
- **useContext**: Subscribes to React context without introducing nesting

### Ref Hooks
- **useRef**: Returns a mutable ref object that persists for the lifetime of the component
- **useImperativeHandle**: Customizes the instance value exposed when using React.forwardRef

### Performance Hooks
- **useMemo**: Returns a memoized value to optimize performance
- **useCallback**: Returns a memoized callback function to prevent unnecessary renders

### Other Hooks
- **useDebugValue**: Used to display a label for custom hooks in React DevTools
- **useId**: Generates unique IDs for accessibility attributes
- **useSyncExternalStore**: For subscribing to external data sources
- **useTransition**: For marking state updates as non-urgent
- **useDeferredValue**: For deferring updates to a less urgent part of the UI

## Creating Custom Hooks

One of the most powerful features of Hooks is the ability to create your own custom Hooks. A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks.

Custom Hooks let you extract component logic into reusable functions, making your code more modular and easier to test.

## Migrating to Hooks

React doesn't plan to remove classes from React. However, if you're starting a new project or new component, Hooks are recommended as they provide a more direct API to React concepts and help avoid confusion around `this`.

When migrating existing code:
- There's no rush to migrate to Hooks
- Avoid rewriting stable class components
- Hooks and classes can be used side by side
- Consider using Hooks in new components first

## Hooks vs. Class Components

While Hooks provide a more concise way to use React features, there are still some valid reasons to use class components:

- Error boundaries currently require class components
- Some lifecycle methods like `getSnapshotBeforeUpdate` and `componentDidCatch` don't have Hook equivalents yet

However, for most new code, Hooks are the recommended approach because they:
- Reduce boilerplate
- Make it easier to reuse logic
- Encourage better code organization
- Avoid confusion with `this`
- Are generally more concise

In the following sections, we'll explore each of the built-in Hooks in detail, along with patterns for creating and using custom Hooks effectively.
# React JS: Hooks - useState

The `useState` hook is one of the most fundamental hooks in React. It allows you to add state to functional components, which was previously only possible with class components.

## Basic Usage

The `useState` hook takes an initial state value and returns an array with two elements: the current state value and a function to update it.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable named "count" with initial value 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In this example:
- `count` is the current state value
- `setCount` is the function to update the state
- `0` is the initial state value

## Multiple State Variables

You can use the `useState` hook multiple times in a single component to manage different state values:

```jsx
function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}
```

## Complex State with Objects

You can use objects as state values to group related data:

```jsx
function UserForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,  // Important: spread the existing user properties
      [name]: value  // Update only the changed field
    });
  };
  
  return (
    <form>
      <input
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="First name"
      />
      <input
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Last name"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </form>
  );
}
```

**Important**: Unlike `this.setState` in class components, the `useState` update function **does not automatically merge objects**. You need to manually spread the previous state when updating only part of an object.

## Arrays as State

You can also use arrays as state values:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Lazy Initial State

If the initial state is the result of an expensive computation, you can provide a function to `useState` which will be executed only on the initial render:

```jsx
function ExpensiveInitialState() {
  // This function will only be called once, on the initial render
  const [state, setState] = useState(() => {
    console.log('Computing initial state');
    return computeExpensiveValue();
  });
  
  return (
    <div>
      <p>State: {state}</p>
      <button onClick={() => setState(state + 1)}>Increment</button>
    </div>
  );
}

function computeExpensiveValue() {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}
```

## Functional Updates

When the new state depends on the previous state, it's recommended to use the functional form of the update function:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // This is safer for multiple updates and avoids race conditions
    setCount(prevCount => prevCount + 1);
  };
  
  const incrementThree = () => {
    // These will work correctly because each update is based on the previous state
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementThree}>Increment by 3</button>
    </div>
  );
}
```

Using the functional update form is especially important when:
- The new state depends on the previous state
- Multiple state updates happen in a single event handler
- State updates might be batched by React

## State Updates Are Asynchronous

State updates in React are asynchronous, which means the state variable won't update immediately after calling the setter function:

```jsx
function AsyncExample() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // This will still be the old value
    
    // If you need to perform an action after the state updates,
    // use useEffect or the useEffect cleanup function
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

## Replacing useState with useReducer

For complex state logic, especially when the next state depends on the previous state or when state transitions are numerous, consider using `useReducer` instead of `useState`:

```jsx
import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function Counter() {
  // useReducer takes a reducer function and an initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

## Best Practices for useState

1. **Keep state minimal**: Only include values in state that are needed for rendering or data flow.

2. **Group related state**: If you have state values that change together, consider combining them into a single object or using `useReducer`.

3. **Avoid redundant state**: Don't store values in state that can be computed from props or other state.

4. **Use functional updates for state that depends on previous state**: This prevents bugs from stale state values.

5. **Initialize state properly**: Use lazy initialization for expensive computations.

6. **Name state variables clearly**: Use descriptive names for state variables and their setter functions.

7. **Separate independent state**: If state values are unrelated, use multiple `useState` calls rather than combining them into a single object.

8. **Consider custom hooks for reusable state logic**: Extract common state management patterns into custom hooks.

The `useState` hook is a powerful tool that enables functional components to manage state in a clean and concise way. By understanding its nuances and best practices, you can write more maintainable and efficient React components.
# React JS: Hooks - useEffect

The `useEffect` hook is one of the most important hooks in React. It allows you to perform side effects in function components, which was previously only possible with lifecycle methods in class components.

## Basic Usage

The `useEffect` hook takes two arguments: a function that contains the side effect code, and an optional dependency array.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In this example, the effect runs after every render, updating the document title.

## Effect Dependencies

To optimize performance, you can specify when an effect should run by providing a dependency array as the second argument:

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

- If the dependency array is empty `[]`, the effect runs only once after the initial render (similar to `componentDidMount`).
- If you omit the dependency array, the effect runs after every render.
- If you include values in the array, the effect runs only when those values change.

## Cleaning Up Effects

Some effects need to be cleaned up to prevent memory leaks. For example, if you subscribe to an external data source, you should unsubscribe when the component unmounts.

To clean up an effect, return a function from your effect:

```jsx
useEffect(() => {
  // Set up subscription
  const subscription = dataSource.subscribe();
  
  // Clean up function (runs before the effect runs again or when component unmounts)
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]); // Re-subscribe if dataSource changes
```

The cleanup function runs:
- Before the component unmounts (similar to `componentWillUnmount`)
- Before the effect runs again if the dependencies have changed

## Common Use Cases for useEffect

### 1. Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    // Define async function inside useEffect
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    
    // Optional cleanup function
    return () => {
      // Cancel any pending requests if needed
    };
  }, [userId]); // Re-run when userId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### 2. Subscriptions

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatService = new ChatService(roomId);
    
    // Subscribe to messages
    const unsubscribe = chatService.subscribe(newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
    
    // Clean up subscription
    return () => {
      unsubscribe();
      chatService.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. DOM Manipulations

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element after render
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty array means run once after initial render

  return <input ref={inputRef} />;
}
```

### 4. Timers

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Clean up timer
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array means run once after initial render

  return <p>Seconds: {seconds}</p>;
}
```

### 5. Synchronizing with External Systems

```jsx
function MapComponent({ center }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    const newMap = new MapLibrary.Map(mapRef.current, {
      center,
      zoom: 10
    });
    
    setMap(newMap);
    
    return () => {
      newMap.destroy();
    };
  }, []); // Initialize once

  // Update map when center changes
  useEffect(() => {
    if (!map) return;
    map.setCenter(center);
  }, [map, center]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
}
```

## Advanced Patterns with useEffect

### 1. Skipping Effects Conditionally

Sometimes you want to run an effect only under certain conditions:

```jsx
useEffect(() => {
  if (isOnline) {
    // Only run this effect if isOnline is true
    const subscription = dataSource.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }
  // No cleanup needed if we didn't subscribe
}, [isOnline, dataSource]);
```

### 2. Handling Race Conditions in Data Fetching

When fetching data based on props that change frequently, you might encounter race conditions where an older request completes after a newer one:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        
        // Only update state if the component is still mounted
        // and this effect is still current
        if (isMounted) {
          setResults(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setLoading(false);
        }
      }
    };

    fetchResults();

    // Cleanup function sets isMounted to false when the component
    // unmounts or when the effect runs again
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 3. Debouncing with useEffect

For inputs that trigger expensive operations, you can use debouncing:

```jsx
function SearchInput() {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  // Update debouncedInput after input stops changing for 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  // Use debouncedInput for expensive operations
  useEffect(() => {
    if (debouncedInput) {
      performSearch(debouncedInput);
    }
  }, [debouncedInput]);

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Common Mistakes with useEffect

### 1. Missing Dependencies

React's ESLint rules will warn you about missing dependencies, but sometimes you might be tempted to ignore them:

```jsx
// ❌ Bad: Missing dependency
function Counter({ step }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + step); // Depends on count and step
    }, 1000);
    return () => clearInterval(id);
  }, []); // Missing dependencies: count and step
}

// ✅ Good: Using functional updates to remove count dependency
function Counter({ step }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step); // No longer depends on count
    }, 1000);
    return () => clearInterval(id);
  }, [step]); // Only depends on step
}
```

### 2. Infinite Loops

If you update state in an effect without proper dependencies, you can create an infinite loop:

```jsx
// ❌ Bad: Infinite loop
function InfiniteLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This runs after every render and updates state,
    // which causes another render, and so on
    setCount(count + 1);
  }); // No dependency array

  return <div>{count}</div>;
}

// ✅ Good: Run only once
function RunOnce() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []); // Empty dependency array

  return <div>{count}</div>;
}
```

### 3. Object and Function Dependencies

Objects and functions created during render will be different on each render, which can cause effects to run more often than needed:

```jsx
// ❌ Bad: New object on every render
function Example({ id }) {
  const [data, setData] = useState(null);

  // This object is recreated on every render
  const options = { 
    headers: { 'Content-Type': 'application/json' }
  };

  useEffect(() => {
    fetchData(id, options).then(setData);
  }, [id, options]); // options is always new, so effect runs on every render

  return <div>{/* ... */}</div>;
}

// ✅ Good: Move object inside effect or use useMemo
function Example({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define options inside the effect
    const options = { 
      headers: { 'Content-Type': 'application/json' }
    };
    
    fetchData(id, options).then(setData);
  }, [id]); // Only depends on id

  return <div>{/* ... */}</div>;
}
```

## Best Practices for useEffect

1. **Keep effects focused**: Each effect should do one thing. Split multiple unrelated side effects into separate `useEffect` calls.

2. **Include all dependencies**: Always include all values from the component scope that change over time and are used by the effect.

3. **Use functional updates for state**: When updating state based on previous state, use the functional form to avoid unnecessary dependencies.

4. **Avoid object and function dependencies when possible**: Move object and function declarations inside the effect, or memoize them with `useMemo` and `useCallback`.

5. **Clean up properly**: Return a cleanup function from your effect to prevent memory leaks.

6. **Handle async operations carefully**: Define async functions inside your effect and handle component unmounting properly.

7. **Consider extracting complex effects into custom hooks**: This improves reusability and makes your components cleaner.

The `useEffect` hook is a powerful tool for handling side effects in React components. By understanding its nuances and following best practices, you can write more maintainable and efficient React applications.
# React JS: Hooks - useContext

The `useContext` hook provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

## Understanding Context in React

Before diving into `useContext`, it's important to understand how Context works in React:

1. **Create a Context**: First, you create a Context object using `React.createContext()`
2. **Provide a Context value**: Use a Context Provider to pass the value down the component tree
3. **Consume the Context**: Components can then consume this value using `useContext`

## Basic Usage

Here's a simple example of using the `useContext` hook:

```jsx
import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a Context
const ThemeContext = createContext('light');

// Step 2: Create a Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // The value prop will be passed to consuming components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Consume the Context with useContext
function ThemedButton() {
  // Get the context value
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme
    </button>
  );
}

// App component that uses the ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>useContext Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
```

In this example:
- We create a `ThemeContext` with a default value of `'light'`
- The `ThemeProvider` component manages the theme state and provides it to its children
- The `ThemedButton` component consumes the context using `useContext` without needing props passed down

## Default Value

The argument passed to `createContext` is only used when a component does not have a matching Provider above it in the tree:

```jsx
const ThemeContext = createContext('light'); // Default value is 'light'

function ComponentWithoutProvider() {
  const theme = useContext(ThemeContext); // Will be 'light'
  return <div>Current theme: {theme}</div>;
}
```

This is useful for:
- Testing components in isolation
- Making components usable even when they're not wrapped in a Provider
- Providing a fallback value

## Multiple Contexts

You can use multiple contexts in the same component:

```jsx
const ThemeContext = createContext('light');
const UserContext = createContext({ name: 'Guest' });

function ProfilePage() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <h1 style={{ color: theme === 'light' ? '#333' : '#fff' }}>
        Welcome, {user.name}!
      </h1>
    </div>
  );
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: 'John' }}>
        <ProfilePage />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

## Creating a Custom Context Hook

A common pattern is to create a custom hook that provides the context and throws an error if it's used outside of a Provider:

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Call API to authenticate
      const user = await api.login(credentials);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    setLoading(true);
    try {
      await api.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Usage in components
function LoginPage() {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Redirect or show success message
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}

function ProfileButton() {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Link to="/login">Log in</Link>;
  }
  
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
```

## Context with Reducers

For more complex state management, you can combine `useContext` with `useReducer`:

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  todos: [],
  loading: false,
  error: null
};

// Create a reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'FETCH_TODOS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Create the context
const TodoContext = createContext();

// Create a provider component
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // Actions
  const fetchTodos = async () => {
    dispatch({ type: 'FETCH_TODOS_START' });
    try {
      const todos = await api.fetchTodos();
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_ERROR', payload: error.message });
    }
  };
  
  const addTodo = async (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    try {
      await api.addTodo(newTodo);
    } catch (error) {
      console.error('Failed to add todo:', error);
      // You might want to dispatch an error action here
    }
  };
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };
  
  const value = {
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  };
  
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Create a custom hook to use the todo context
export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}

// Usage in components
function TodoList() {
  const { todos, loading, error, fetchTodos, toggleTodo, deleteTodo } = useTodos();
  
  useEffect(() => {
    fetchTodos();
  }, []);
  
  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

## Performance Considerations

### Context Re-renders

When a context value changes, all components that use that context will re-render, even if they only use a portion of the context value. To optimize performance:

1. **Split contexts by domain**: Create separate contexts for unrelated state that changes at different frequencies.

2. **Memoize context values**: Use `useMemo` to prevent unnecessary re-renders when the context value hasn't actually changed.

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);
  
  // Memoize the context value
  const value = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

3. **Use context selectors**: Create custom hooks that select only the specific parts of context a component needs.

```jsx
// Create a hook that only returns the theme
export function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme;
}

// Create a hook that only returns the toggle function
export function useThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);
  return toggleTheme;
}
```

## Best Practices for useContext

1. **Don't overuse context**: Context is primarily designed for data that is considered global for a tree of React components. Don't use it for data that should be passed as props.

2. **Create custom hooks**: Wrap context usage in custom hooks to make your code more readable and maintainable.

3. **Provide meaningful default values**: When creating a context, provide a meaningful default value that makes sense even if a component is not wrapped in a provider.

4. **Keep context focused**: Each context should have a single responsibility. Don't put unrelated data in the same context.

5. **Document your contexts**: Make sure to document what each context is for and how it should be used.

6. **Consider alternatives**: For complex state management needs, consider using libraries like Redux, MobX, or Zustand, which are designed for more complex state management scenarios.

The `useContext` hook is a powerful tool for sharing state across components without prop drilling. When used appropriately, it can significantly simplify your component hierarchy and make your code more maintainable.
# React JS: Hooks - useRef

The `useRef` hook is a powerful feature in React that provides a way to create a mutable reference that persists across renders. Unlike state variables, updating a ref doesn't trigger a re-render, making it ideal for storing values that need to persist but don't affect the visual output of your component.

## Basic Usage

The `useRef` hook returns a mutable ref object with a `.current` property that is initialized to the passed argument:

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  // Initialize useRef with null (since no DOM element exists yet)
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Access the current property to get the DOM element
    inputRef.current.focus();
  };
  
  return (
    <div>
      {/* Attach the ref to an input element */}
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
```

In this example, `inputRef.current` will be set to the DOM input element once the component mounts.

## Common Use Cases for useRef

### 1. Accessing DOM Elements

The most common use case for `useRef` is to access DOM elements directly:

```jsx
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  
  const play = () => {
    videoRef.current.play();
  };
  
  const pause = () => {
    videoRef.current.pause();
  };
  
  return (
    <div>
      <video ref={videoRef} src={src} />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}
```

### 2. Storing Previous Values

You can use refs to store the previous value of a prop or state:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    // Store current count value in ref after render
    prevCountRef.current = count;
  });
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <h1>Now: {count}, before: {prevCount !== undefined ? prevCount : 'N/A'}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

This pattern can be extracted into a custom hook:

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <h1>Now: {count}, before: {prevCount !== undefined ? prevCount : 'N/A'}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 3. Storing Mutable Values Without Re-renders

Unlike state, updating a ref doesn't cause a re-render. This makes refs useful for storing values that need to change but shouldn't trigger re-renders:

```jsx
function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (!isRunning) return;
    
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <h1>Time: {time} seconds</h1>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

### 4. Implementing Instance Variables

In class components, you could use instance variables to store data that persists between renders but doesn't affect the UI. With hooks, you can use refs for this purpose:

```jsx
function SearchComponent() {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Store the latest query to avoid race conditions
  const latestQuery = useRef('');
  
  const search = async (query) => {
    setIsSearching(true);
    latestQuery.current = query;
    
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      
      // Only update results if this is still the latest query
      if (query === latestQuery.current) {
        setResults(data);
      }
    } finally {
      if (query === latestQuery.current) {
        setIsSearching(false);
      }
    }
  };
  
  return (
    <div>
      <input 
        type="text" 
        onChange={(e) => search(e.target.value)} 
        placeholder="Search..." 
      />
      {isSearching && <p>Searching...</p>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## useRef vs. useState

It's important to understand when to use `useRef` versus `useState`:

- **Use useState when**:
  - The value needs to be displayed or used in rendering
  - Changes to the value should trigger a re-render
  - You want React to know about the value change

- **Use useRef when**:
  - The value doesn't affect the visual output directly
  - Changes to the value shouldn't trigger a re-render
  - You need to access DOM elements
  - You need to store a mutable value that persists across renders

## forwardRef with useRef

Sometimes you need to pass a ref from a parent component to a child component. React provides `forwardRef` for this purpose:

```jsx
import React, { useRef, forwardRef } from 'react';

// Child component that forwards the ref to an input
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Parent component that creates and passes the ref
function Form() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

## useImperativeHandle with forwardRef

For more control over what is exposed to parent components, you can use `useImperativeHandle` with `forwardRef`:

```jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  // Expose only specific functions to the parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

function Form() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    // Can only access the methods exposed by useImperativeHandle
    inputRef.current.focus();
  };
  
  const handleClear = () => {
    inputRef.current.clear();
  };
  
  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

## Advanced Patterns with useRef

### 1. Callback Refs

Instead of using `useRef`, you can use a callback function as a ref:

```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);
  
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  
  return (
    <div>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </div>
  );
}
```

This pattern can be extracted into a custom hook:

```jsx
function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  
  return [rect, ref];
}

// Usage
function MeasureExample() {
  const [rect, ref] = useClientRect();
  
  return (
    <div>
      <h1 ref={ref}>Hello, world</h1>
      {rect && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </div>
  );
}
```

### 2. Multiple Refs for a Single Element

Sometimes you need to attach multiple refs to a single element:

```jsx
function MultipleRefsExample() {
  const ownRef = useRef(null);
  const [, setRect] = useState(null);
  
  // Callback ref to measure the element
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  
  // Function to combine refs
  const setRefs = useCallback(
    node => {
      // Set both refs
      ownRef.current = node;
      measuredRef(node);
    },
    [measuredRef]
  );
  
  return <div ref={setRefs}>This element has multiple refs</div>;
}
```

## Common Mistakes with useRef

### 1. Forgetting That Refs Don't Trigger Re-renders

```jsx
// ❌ Bad: This won't work as expected
function Counter() {
  const countRef = useRef(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log(`Count: ${countRef.current}`); // This will update
    // But the component won't re-render
  };
  
  return (
    <div>
      <p>Count: {countRef.current}</p> {/* This won't update in the UI */}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// ✅ Good: Use state for values that should trigger re-renders
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 2. Accessing Refs Before They're Assigned

```jsx
// ❌ Bad: Trying to access ref before it's assigned
function AutoFocus() {
  const inputRef = useRef(null);
  
  // This runs before the ref is assigned
  inputRef.current.focus(); // Error: Cannot read property 'focus' of null
  
  return <input ref={inputRef} />;
}

// ✅ Good: Use useEffect to access refs after mounting
function AutoFocus() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // This runs after the component mounts and the ref is assigned
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} />;
}
```

### 3. Not Cleaning Up Resources

```jsx
// ❌ Bad: Not cleaning up interval
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  // Missing cleanup
  
  return (
    <div>
      <p>Time: {time}</p>
      <button onClick={startTimer}>Start</button>
    </div>
  );
}

// ✅ Good: Clean up resources
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <p>Time: {time}</p>
      <button onClick={startTimer}>Start</button>
    </div>
  );
}
```

## Best Practices for useRef

1. **Use refs for their intended purpose**: DOM access, storing mutable values that don't affect rendering, and preserving values between renders.

2. **Don't overuse refs**: If a value should trigger a re-render when it changes, use state instead.

3. **Clean up resources**: Always clean up any resources (like timers or subscriptions) stored in refs.

4. **Access refs after mounting**: Use `useEffect` to access refs after the component has mounted.

5. **Use forwardRef when needed**: When creating reusable components that need to expose DOM elements, use `forwardRef`.

6. **Consider useImperativeHandle**: Use `useImperativeHandle` to customize what parent components can access through a ref.

7. **Extract complex ref logic into custom hooks**: This improves reusability and makes your components cleaner.

The `useRef` hook is a powerful tool in React that, when used correctly, can help you manage DOM access and mutable values without triggering unnecessary re-renders. By understanding its capabilities and limitations, you can write more efficient and maintainable React components.
# React JS: Hooks - useMemo and useCallback

The `useMemo` and `useCallback` hooks are performance optimization hooks in React that help prevent unnecessary calculations and re-renders. They are particularly useful in complex applications where performance is a concern.

## useMemo Hook

The `useMemo` hook memoizes the result of a computation, recalculating it only when one of its dependencies changes. This is useful for expensive calculations that you don't want to repeat on every render.

### Basic Usage

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ list, filter }) {
  // The filtered list will only be recalculated when list or filter changes
  const filteredList = useMemo(() => {
    console.log('Filtering list...');
    return list.filter(item => item.includes(filter));
  }, [list, filter]); // Dependencies array
  
  return (
    <div>
      <h2>Filtered List</h2>
      <ul>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, the filtering operation will only run when either `list` or `filter` changes, not on every render.

### When to Use useMemo

You should consider using `useMemo` when:

1. **You have computationally expensive calculations**: Operations that iterate over large arrays, complex data transformations, or heavy mathematical calculations.

2. **You want to avoid recreating objects on every render**: Creating new objects or arrays in render can cause child components to re-render unnecessarily.

3. **The calculation result is used in other hooks' dependency arrays**: Memoizing values used in dependency arrays of `useEffect` or other hooks can prevent unnecessary effect runs.

### Common Use Cases for useMemo

#### 1. Expensive Calculations

```jsx
function DataAnalytics({ data }) {
  const statistics = useMemo(() => {
    console.log('Computing statistics...');
    return {
      average: data.reduce((sum, value) => sum + value, 0) / data.length,
      max: Math.max(...data),
      min: Math.min(...data),
      median: [...data].sort()[Math.floor(data.length / 2)]
    };
  }, [data]);
  
  return (
    <div>
      <h2>Statistics</h2>
      <p>Average: {statistics.average}</p>
      <p>Max: {statistics.max}</p>
      <p>Min: {statistics.min}</p>
      <p>Median: {statistics.median}</p>
    </div>
  );
}
```

#### 2. Preventing Object Recreation

```jsx
function UserProfile({ user }) {
  // Without useMemo, this object would be recreated on every render
  const userStyles = useMemo(() => ({
    container: {
      backgroundColor: user.isPremium ? '#ffd700' : '#ffffff',
      padding: '20px',
      borderRadius: '5px'
    },
    name: {
      color: user.isActive ? '#00aa00' : '#aaaaaa',
      fontWeight: 'bold'
    }
  }), [user.isPremium, user.isActive]);
  
  return (
    <div style={userStyles.container}>
      <h2 style={userStyles.name}>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}
```

#### 3. Memoizing Values for Dependency Arrays

```jsx
function SearchResults({ query, data }) {
  // Memoize the filtered results
  const filteredResults = useMemo(() => {
    return data.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);
  
  // Use the memoized value in the effect dependency array
  useEffect(() => {
    console.log('Results changed:', filteredResults.length);
    // Analytics or logging code here
  }, [filteredResults.length]);
  
  return (
    <ul>
      {filteredResults.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

## useCallback Hook

The `useCallback` hook returns a memoized version of a callback function that only changes if one of its dependencies changes. This is useful for optimizing performance when passing callbacks to child components that rely on reference equality to prevent unnecessary renders.

### Basic Usage

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // This function will only be recreated if count changes
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  
  // This function will be recreated if text changes
  const handleTextChange = useCallback((newText) => {
    setText(newText);
    console.log(`Text changed to: ${newText}`);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Text: {text}</p>
      <ChildComponent 
        onIncrement={incrementCount} 
        onTextChange={handleTextChange} 
      />
    </div>
  );
}

// Using React.memo to prevent unnecessary renders
const ChildComponent = React.memo(function ChildComponent({ onIncrement, onTextChange }) {
  console.log('ChildComponent rendered');
  
  return (
    <div>
      <button onClick={onIncrement}>Increment Count</button>
      <input 
        onChange={(e) => onTextChange(e.target.value)} 
        placeholder="Type something..." 
      />
    </div>
  );
});
```

In this example, `incrementCount` and `handleTextChange` are memoized callbacks. The `ChildComponent` will only re-render if the references to these functions change, which happens only when their dependencies change.

### When to Use useCallback

You should consider using `useCallback` when:

1. **Passing callbacks to optimized child components**: When you pass functions to components wrapped in `React.memo` or that use `shouldComponentUpdate`.

2. **Callbacks are used in dependency arrays**: When the callback is a dependency of another hook like `useEffect`.

3. **Preventing unnecessary renders**: When recreating the function on every render would cause performance issues.

### Common Use Cases for useCallback

#### 1. Optimizing Child Component Renders

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Memoize the add function
  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  }, [newTodo]);
  
  // Memoize the toggle function
  const handleToggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      
      <TodoItems 
        todos={todos} 
        onToggle={handleToggleTodo} 
      />
    </div>
  );
}

// Optimized with React.memo
const TodoItems = React.memo(function TodoItems({ todos, onToggle }) {
  console.log('TodoItems rendered');
  
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => onToggle(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
});
```

#### 2. Using Callbacks in Effect Dependencies

```jsx
function SearchComponent({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  
  // Memoize the search function
  const performSearch = useCallback(async () => {
    if (!query) return;
    
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [query]);
  
  // Use the memoized callback in the effect
  useEffect(() => {
    performSearch();
  }, [performSearch]); // This will only trigger when query changes
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 3. Event Handlers with Dependencies

```jsx
function FormWithValidation({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  
  // This validation function depends on values
  const validate = useCallback(() => {
    const newErrors = {};
    
    if (!values.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);
  
  // This submit handler depends on both validate and onSubmit
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(values);
    }
  }, [validate, onSubmit, values]);
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Comparing useMemo and useCallback

While both hooks are used for memoization, they serve different purposes:

- **useMemo** memoizes a computed value, which can be any value (object, array, number, string, etc.)
- **useCallback** memoizes a function, preventing it from being recreated on every render

In fact, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```jsx
// These are equivalent
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => {
    doSomething(a, b);
  };
}, [a, b]);
```

## Performance Considerations

### When Memoization Might Not Be Needed

Memoization itself has a cost. For simple calculations or functions, the overhead of memoization might outweigh the benefits:

```jsx
// Probably doesn't need useMemo
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`;
}, [firstName, lastName]);

// Simple enough to not need useCallback
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

### Measuring Performance Impact

Before applying `useMemo` or `useCallback` everywhere, measure the performance impact:

1. Use the React DevTools Profiler to identify components that render too often
2. Apply memoization strategically where it makes a measurable difference
3. Test the performance before and after applying memoization

## Best Practices for useMemo and useCallback

1. **Don't overuse them**: Apply these hooks only when there's a clear performance benefit.

2. **Include all dependencies**: Always include all values from the component scope that change over time and are used by the memoized function or computation.

3. **Use them for expensive operations**: Prioritize memoizing computationally expensive calculations.

4. **Combine with React.memo**: These hooks are most effective when used with `React.memo` to prevent unnecessary child component renders.

5. **Consider custom hooks**: Extract complex memoization logic into custom hooks for better reusability.

6. **Be careful with object and array dependencies**: Objects and arrays created inline will be new references on every render, potentially defeating the purpose of memoization.

```jsx
// ❌ Bad: Object created inline will be a new reference every time
useEffect(() => {
  fetchData(options);
}, [options]); // options is recreated every render

// ✅ Good: Memoize the object
const options = useMemo(() => ({
  headers: { 'Content-Type': 'application/json' },
  method: 'GET'
}), []); // Empty dependency array if options never change

useEffect(() => {
  fetchData(options);
}, [options]); // Now options is stable
```

The `useMemo` and `useCallback` hooks are powerful tools for optimizing React applications. When used correctly, they can significantly improve performance by preventing unnecessary calculations and renders. However, they should be applied judiciously, focusing on areas where performance improvements are measurable and meaningful.
# React JS: Hooks - useReducer

The `useReducer` hook is a more powerful alternative to `useState` for managing complex state logic in React components. It's especially useful when the next state depends on the previous state or when state transitions involve multiple sub-values.

## Basic Usage

The `useReducer` hook takes a reducer function and an initial state, and returns the current state and a dispatch function:

```jsx
import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function Counter() {
  // Initialize useReducer with the reducer function and initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

In this example:
- `counterReducer` is the reducer function that specifies how the state updates in response to actions
- `{ count: 0 }` is the initial state
- `state` is the current state value
- `dispatch` is a function that lets you trigger state updates by dispatching actions

## When to Use useReducer vs. useState

While `useState` is great for simple state management, `useReducer` shines in the following scenarios:

1. **Complex state logic**: When state involves multiple sub-values or when the next state depends on the previous one.

2. **Related state transitions**: When multiple state updates frequently happen together.

3. **Predictable state changes**: When you want to make state changes more predictable and easier to test.

4. **Performance optimization**: When you have deep component trees and want to avoid passing callbacks down through many levels.

## Anatomy of a Reducer

A reducer function has the following signature:

```jsx
function reducer(state, action) {
  // Return the new state based on the action
}
```

- `state` is the current state
- `action` is an object that describes what happened (typically with a `type` property)
- The function returns the new state

Reducers should be pure functions:
- They should not modify the existing state
- They should not perform side effects (API calls, etc.)
- Given the same inputs, they should always return the same output

## Advanced useReducer Patterns

### 1. Using an Initial Function

You can pass a function as the third argument to `useReducer` to lazily initialize the state:

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(counterReducer, initialCount, init);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
    </div>
  );
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}
```

This pattern is useful when:
- The initial state is expensive to create
- You need to compute the initial state based on props
- You want to reset the state to its initial value

### 2. Using Action Creators

Action creators are functions that create and return action objects, making your code more maintainable:

```jsx
// Action creators
const increment = () => ({ type: 'increment' });
const decrement = () => ({ type: 'decrement' });
const reset = (value) => ({ type: 'reset', payload: value });

function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(counterReducer, { count: initialCount });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset(initialCount))}>
        Reset
      </button>
    </div>
  );
}
```

### 3. Complex State Management

For more complex state, you can use a more sophisticated reducer:

```jsx
const initialState = {
  user: null,
  posts: [],
  comments: [],
  isLoading: {
    user: false,
    posts: false,
    comments: false
  },
  error: {
    user: null,
    posts: null,
    comments: null
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: true
        },
        error: {
          ...state.error,
          [action.payload]: null
        }
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.payload.dataType]: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [action.payload.dataType]: false
        }
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.dataType]: false
        },
        error: {
          ...state.error,
          [action.payload.dataType]: action.payload.error
        }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function DataFetchingComponent() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const fetchUser = async (userId) => {
    dispatch({ type: 'FETCH_START', payload: 'user' });
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { dataType: 'user', data } 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: { dataType: 'user', error: error.message } 
      });
    }
  };
  
  // Similar functions for fetchPosts and fetchComments
  
  return (
    <div>
      {/* UI components using state */}
    </div>
  );
}
```

### 4. Using Multiple Reducers

For very complex applications, you can use multiple reducers for different parts of your state:

```jsx
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
}

function postsReducer(state, action) {
  switch (action.type) {
    case 'ADD_POSTS':
      return [...state, ...action.payload];
    case 'CLEAR_POSTS':
      return [];
    default:
      return state;
  }
}

function ProfilePage() {
  const [user, userDispatch] = useReducer(userReducer, null);
  const [posts, postsDispatch] = useReducer(postsReducer, []);
  
  // Use the separate reducers for different parts of your state
  
  return (
    <div>
      {/* UI components using user and posts */}
    </div>
  );
}
```

## Combining useReducer with Context

One of the most powerful patterns is combining `useReducer` with the Context API to manage global state:

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the state and dispatch function
const TodoContext = createContext();

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'FETCH_TODOS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Provider component
function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use the todo context
function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

// Action creators
const actions = {
  fetchTodos: () => async (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_START' });
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_ERROR', payload: error.message });
    }
  },
  addTodo: (text) => ({
    type: 'ADD_TODO',
    payload: { id: Date.now(), text, completed: false }
  }),
  toggleTodo: (id) => ({
    type: 'TOGGLE_TODO',
    payload: id
  }),
  deleteTodo: (id) => ({
    type: 'DELETE_TODO',
    payload: id
  })
};

// Usage in components
function TodoApp() {
  return (
    <TodoProvider>
      <TodoList />
      <AddTodoForm />
    </TodoProvider>
  );
}

function TodoList() {
  const { state, dispatch } = useTodo();
  
  useEffect(() => {
    actions.fetchTodos()(dispatch);
  }, []);
  
  if (state.loading) return <p>Loading todos...</p>;
  if (state.error) return <p>Error: {state.error}</p>;
  
  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(actions.toggleTodo(todo.id))}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch(actions.deleteTodo(todo.id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddTodoForm() {
  const { dispatch } = useTodo();
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(actions.addTodo(text));
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

This pattern provides a Redux-like state management solution without the need for external libraries.

## Implementing Middleware with useReducer

You can implement middleware-like functionality with `useReducer` by wrapping the dispatch function:

```jsx
function useReducerWithMiddleware(reducer, initialState, middlewares = []) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const enhancedDispatch = useCallback(
    (action) => {
      // Apply middlewares
      middlewares.forEach(middleware => middleware(state, action));
      
      // Call the original dispatch
      dispatch(action);
    },
    [state, middlewares]
  );
  
  return [state, enhancedDispatch];
}

// Example logger middleware
const loggerMiddleware = (state, action) => {
  console.log('Previous State:', state);
  console.log('Action:', action);
  // Next state will be available after dispatch
};

// Example analytics middleware
const analyticsMiddleware = (state, action) => {
  if (action.type === 'ADD_TODO') {
    // Track event
    analytics.track('Todo Added', {
      todoText: action.payload.text
    });
  }
};

function TodoApp() {
  const [state, dispatch] = useReducerWithMiddleware(
    todoReducer,
    initialState,
    [loggerMiddleware, analyticsMiddleware]
  );
  
  // Rest of the component
}
```

## Best Practices for useReducer

1. **Keep reducers pure**: Reducers should be pure functions without side effects.

2. **Use action creators**: Define action creators to standardize action objects and make your code more maintainable.

3. **Use descriptive action types**: Action types should clearly describe what's happening (e.g., 'FETCH_USERS_SUCCESS' instead of 'SUCCESS').

4. **Organize by domain**: Split reducers by domain or feature for better organization in larger applications.

5. **Combine with Context for global state**: Use the Context API with `useReducer` for global state management.

6. **Consider immer for complex state**: Libraries like immer can make updating complex nested state easier and more intuitive.

7. **Extract complex logic**: Move complex state update logic into separate helper functions to keep your reducer clean.

8. **Test your reducers**: Reducers are pure functions, making them easy to test in isolation.

The `useReducer` hook provides a powerful way to manage complex state logic in React applications. By following patterns similar to Redux, you can create predictable state containers that are easier to understand, test, and debug. When combined with the Context API, `useReducer` can even replace external state management libraries for many applications.
# React JS: Introduction

React is a JavaScript library for building user interfaces. Developed and maintained by Facebook (now Meta), React has become one of the most popular front-end libraries in web development since its initial release in 2013.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components". React's primary goal is to minimize the bugs that occur when developers are building UIs by using components — self-contained, logical pieces of code that describe a portion of the user interface.

Key characteristics of React include:

1. **Declarative**: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.

2. **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.

3. **Learn Once, Write Anywhere**: React doesn't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

4. **Virtual DOM**: React creates an in-memory data structure cache, computes the resulting differences, and then updates the browser's displayed DOM efficiently. This allows the programmer to write code as if the entire page is rendered on each change, while the React libraries only render subcomponents that actually change.

5. **Unidirectional Data Flow**: In React, data flows in one direction, from parent components to child components. This makes it easier to understand how data changes affect the application.

## Why Use React?

React offers several advantages that have contributed to its widespread adoption:

1. **Reusable Components**: React's component-based architecture promotes reusability, which can significantly speed up development.

2. **Performance**: The Virtual DOM implementation helps optimize rendering performance.

3. **Strong Community Support**: React has a large and active community, providing a wealth of resources, libraries, and tools.

4. **Backed by Facebook**: Being developed and maintained by Facebook ensures that React continues to evolve and improve.

5. **React Native**: Skills learned in React can be applied to mobile app development with React Native.

6. **Developer Tools**: React offers excellent developer tools for debugging and performance optimization.

7. **SEO-Friendly**: Unlike some JavaScript frameworks, React applications can be made SEO-friendly with server-side rendering.

## React vs. Frameworks

Unlike Angular or Vue, React is not a framework – it's a library. React is focused specifically on the view layer and doesn't include many of the tools that come standard in a framework. This gives developers more freedom to choose the tools they want to use alongside React, but it also means they need to make more decisions.

React is often used with additional libraries to handle routing (React Router), state management (Redux, MobX, or the built-in Context API), and other aspects of web application development.

## React's Philosophy

React's design philosophy emphasizes component composition, declarative programming, and the idea that rendering logic should be inherently coupled with other UI logic. This approach has influenced many other libraries and frameworks in the JavaScript ecosystem.

React encourages developers to think in terms of components, breaking down complex UIs into smaller, reusable pieces. This modular approach makes code more maintainable and easier to understand.

In the next sections, we'll explore React's core concepts, including JSX, components, props, state, and lifecycle methods, to provide a comprehensive understanding of how React works and how to use it effectively.
# React JS: Ecosystem and Tools

The React ecosystem is rich and diverse, offering a wide range of libraries, tools, and frameworks that complement React's core functionality. Understanding this ecosystem is crucial for building modern React applications efficiently. This section provides an overview of the most important parts of the React ecosystem.

## State Management Libraries

While React provides built-in state management through hooks like `useState`, `useReducer`, and the Context API, many applications benefit from more robust state management solutions.

### Redux

Redux is one of the most popular state management libraries for React applications. It provides a predictable state container based on three principles:

1. **Single source of truth**: The state of your entire application is stored in an object tree within a single store.
2. **State is read-only**: The only way to change the state is to emit an action, an object describing what happened.
3. **Changes are made with pure functions**: Reducers are pure functions that take the previous state and an action, and return the next state.

```jsx
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Store
const store = createStore(counterReducer);

// App component
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Counter component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

**Redux Toolkit** is the official, opinionated, batteries-included toolset for efficient Redux development. It simplifies common Redux use cases, including store setup, creating reducers, immutable update logic, and more.

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Create a slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: state => {
      state.count += 1; // Immer allows "mutating" syntax
    },
    decrement: state => {
      state.count -= 1;
    }
  }
});

// Extract action creators and reducer
const { increment, decrement } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

// Configure store
const store = configureStore({
  reducer: counterReducer
});

// Counter component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

### MobX

MobX is a state management library that makes state management simple and scalable by applying transparent functional reactive programming. It uses observables, actions, and reactions to manage state.

```jsx
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// Store
class CounterStore {
  count = 0;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  increment() {
    this.count += 1;
  }
  
  decrement() {
    this.count -= 1;
  }
}

const counterStore = new CounterStore();

// Observer component
const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
    </div>
  );
});
```

### Zustand

Zustand is a small, fast, and scalable state management solution. It has a simple API based on hooks and doesn't require providers.

```jsx
import create from 'zustand';

// Create store
const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}));

// Component
function Counter() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Recoil

Recoil is a state management library developed by Facebook specifically for React applications. It provides several capabilities that are difficult to achieve with React alone while being compatible with the newest features of React.

```jsx
import { atom, useRecoilState } from 'recoil';

// Define an atom
const countState = atom({
  key: 'countState',
  default: 0
});

function Counter() {
  const [count, setCount] = useRecoilState(countState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

## Routing

Routing is essential for creating multi-page applications with React.

### React Router

React Router is the standard routing library for React applications. It enables navigation among views in a React application, allows browsers to change the URL, and keeps the UI in sync with the URL.

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Next.js Routing

Next.js, a React framework, provides its own file-system based routing:

```jsx
// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// pages/contact.js
export default function Contact() {
  return <h1>Contact Page</h1>;
}
```

## Form Handling

Forms are a crucial part of many web applications, and several libraries make form handling in React easier.

### Formik

Formik is a popular form library that helps with form state, validation, error handling, and submission.

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

function SignupForm() {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          
          <div>
            <Field name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          
          <div>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
```

### React Hook Form

React Hook Form is a lightweight form library focused on performance and reducing re-renders.

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required')
});

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = data => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('firstName')} placeholder="First Name" />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      
      <div>
        <input {...register('lastName')} placeholder="Last Name" />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      
      <div>
        <input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## UI Component Libraries

These libraries provide pre-built, customizable UI components to speed up development.

### Material-UI (MUI)

Material-UI is a popular React UI framework that implements Google's Material Design.

```jsx
import { Button, TextField, Container, Typography } from '@mui/material';

function LoginForm() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      
      <form>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}
```

### Chakra UI

Chakra UI is a simple, modular, and accessible component library that gives you the building blocks to build React applications.

```jsx
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading
} from '@chakra-ui/react';

function LoginForm() {
  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading>Login</Heading>
          
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          
          <Button colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
```

### Ant Design

Ant Design is an enterprise-class UI design language and React UI library with a set of high-quality React components.

```jsx
import { Form, Input, Button, Typography } from 'antd';
const { Title } = Typography;

function LoginForm() {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Title level={2}>Login</Title>
      
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
```

## Data Fetching

These libraries help with fetching, caching, and updating data in React applications.

### React Query

React Query is a data-fetching and state management library for React that makes fetching, caching, and updating server state in React applications easy.

```jsx
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  const { isLoading, error, data } = useQuery('users', () =>
    fetch('https://api.example.com/users').then(res => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### SWR

SWR (stale-while-revalidate) is a React Hooks library for data fetching that handles caching, revalidation, focus tracking, refetching on interval, and more.

```jsx
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

function Users() {
  const { data, error } = useSWR('https://api.example.com/users', fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Apollo Client

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.

```jsx
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache()
});

// Query
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
}

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Testing Libraries

Testing is a crucial part of developing robust React applications.

### Jest

Jest is a JavaScript testing framework that works with React and focuses on simplicity. It's often used as the test runner and assertion library.

```jsx
// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  fireEvent.click(screen.getByText('Click Me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### React Testing Library

React Testing Library is a set of helpers that let you test React components without relying on their implementation details.

```jsx
// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count when button is clicked', () => {
  render(<Counter />);
  
  const button = screen.getByText('+');
  const count = screen.getByText(/count: 0/i);
  
  fireEvent.click(button);
  
  expect(count).toHaveTextContent('Count: 1');
});
```

### Cypress

Cypress is an end-to-end testing framework that makes it easy to set up, write, run, and debug tests for your React applications.

```javascript
// cypress/integration/login.spec.js
describe('Login Form', () => {
  it('successfully logs in', () => {
    cy.visit('/login');
    
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, User!');
  });
});
```

## Build Tools and Bundlers

These tools help compile, bundle, and optimize your React applications.

### Create React App

Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.

```bash
npx create-react-app my-app
cd my-app
npm start
```

### Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It's becoming increasingly popular for React development.

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Next.js

Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes.

```bash
npx create-next-app my-app
cd my-app
npm run dev
```

### Webpack

Webpack is a module bundler that's commonly used with React. It takes modules with dependencies and generates static assets.

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
```

## Developer Tools

These tools enhance the development experience when working with React.

### React Developer Tools

React Developer Tools is a browser extension for Chrome and Firefox that allows you to inspect the React component hierarchy, props, state, and more.

### ESLint

ESLint is a static code analysis tool for identifying problematic patterns in JavaScript code. It's commonly used with React to enforce best practices.

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### Prettier

Prettier is an opinionated code formatter that enforces a consistent style by parsing your code and reprinting it with its own rules.

```javascript
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Storybook

Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.

```jsx
// Button.stories.js
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button
};

export const Primary = () => <Button primary>Primary Button</Button>;
export const Secondary = () => <Button>Secondary Button</Button>;
export const Large = () => <Button size="large">Large Button</Button>;
export const Small = () => <Button size="small">Small Button</Button>;
```

## Styling Solutions

React offers various approaches to styling components.

### CSS Modules

CSS Modules let you use the same CSS class name in different files without worrying about naming clashes.

```css
/* Button.module.css */
.button {
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
}

.primary {
  background-color: blue;
  color: white;
}
```

```jsx
// Button.js
import styles from './Button.module.css';

function Button({ primary, children }) {
  return (
    <button className={`${styles.button} ${primary ? styles.primary : ''}`}>
      {children}
    </button>
  );
}
```

### Styled Components

Styled Components lets you write actual CSS in your JavaScript, allowing for dynamic styling based on props.

```jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'black'};
`;

function App() {
  return (
    <div>
      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
    </div>
  );
}
```

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that can be used with React to rapidly build custom designs.

```jsx
function Button({ primary, children }) {
  return (
    <button
      className={`
        px-4 py-2 rounded font-bold
        ${primary ? 'bg-blue-500 text-white' : 'bg-white text-black'}
      `}
    >
      {children}
    </button>
  );
}
```

## Animation Libraries

These libraries help create smooth animations in React applications.

### React Spring

React Spring is a spring-physics based animation library that should cover most of your UI animation needs.

```jsx
import { useSpring, animated } from 'react-spring';

function AnimatedButton() {
  const [props, set] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 }
  }));
  
  return (
    <animated.button
      style={{
        transform: props.scale.to(s => `scale(${s})`)
      }}
      onMouseEnter={() => set({ scale: 1.1 })}
      onMouseLeave={() => set({ scale: 1 })}
    >
      Hover me
    </animated.button>
  );
}
```

### Framer Motion

Framer Motion is a production-ready motion library for React that makes creating animations easy.

```jsx
import { motion } from 'framer-motion';

function AnimatedButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Click me
    </motion.button>
  );
}
```

## Server-Side Rendering and Static Site Generation

These frameworks enable server-side rendering (SSR) and static site generation (SSG) with React.

### Next.js

Next.js supports both SSR and SSG out of the box:

```jsx
// SSR Example
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

// SSG Example
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate page every 60 seconds
  };
}

export default function Page({ data }) {
  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Gatsby

Gatsby is a static site generator for React that uses GraphQL to source data:

```jsx
import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default function HomePage({ data }) {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>Welcome to my Gatsby site!</p>
    </div>
  );
}
```

## Mobile Development

React can also be used for mobile app development.

### React Native

React Native lets you build mobile apps using only JavaScript and React. It uses the same design as React, letting you compose a rich mobile UI from declarative components.

```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
```

## Choosing the Right Tools

When building a React application, it's important to choose the right tools for your specific needs. Here are some considerations:

1. **Project size and complexity**: For small projects, you might not need a state management library. For larger projects, Redux or MobX might be beneficial.

2. **Team experience**: Consider your team's familiarity with certain tools and libraries.

3. **Performance requirements**: Some libraries are more performance-focused than others.

4. **Bundle size**: Be mindful of how each library affects your application's bundle size.

5. **Community support**: Choose libraries with active communities and good documentation.

6. **Long-term maintenance**: Consider whether the tools you choose are likely to be maintained in the long term.

The React ecosystem is constantly evolving, with new tools and libraries emerging regularly. Staying up-to-date with the latest developments can help you build better React applications more efficiently.
# React JS: Best Practices

Adopting best practices in React development is crucial for creating maintainable, performant, and scalable applications. This section covers essential best practices that will help you write better React code and prepare for technical interviews.

## Component Structure and Organization

### 1. Follow the Single Responsibility Principle

Components should ideally do one thing. If a component becomes too complex, consider breaking it down into smaller, more manageable components.

```jsx
// ❌ Bad: Component doing too many things
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  
  // Fetch user data
  useEffect(() => { /* ... */ }, []);
  
  // Fetch posts
  useEffect(() => { /* ... */ }, []);
  
  // Fetch comments
  useEffect(() => { /* ... */ }, []);
  
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
      <UserComments comments={comments} />
    </div>
  );
}

// ✅ Good: Split into smaller components
function UserDashboard() {
  return (
    <div>
      <UserProfileContainer />
      <UserPostsContainer />
      <UserCommentsContainer />
    </div>
  );
}

function UserProfileContainer() {
  const [user, setUser] = useState(null);
  useEffect(() => { /* ... */ }, []);
  return <UserProfile user={user} />;
}

// Similar pattern for other containers
```

### 2. Organize by Feature, Not by Type

Structure your project by features or domains rather than by type of files:

```
// ❌ Bad: Organized by type
src/
  components/
    Button.js
    Card.js
    Modal.js
  pages/
    Home.js
    Profile.js
  utils/
    api.js
    helpers.js

// ✅ Good: Organized by feature
src/
  features/
    auth/
      components/
        LoginForm.js
        SignupForm.js
      hooks/
        useAuth.js
      services/
        authApi.js
    profile/
      components/
        ProfileCard.js
        ProfileEdit.js
      hooks/
        useProfile.js
  shared/
    components/
      Button.js
      Card.js
    utils/
      helpers.js
```

### 3. Use Consistent Naming Conventions

Adopt consistent naming conventions for your components, files, and functions:

- Use PascalCase for component names and files: `UserProfile.js`
- Use camelCase for variables, functions, and instances: `const userData = ...`
- Use UPPER_SNAKE_CASE for constants: `const MAX_ITEMS = 10`
- Use descriptive names that reflect the component's purpose

## State Management

### 1. Keep State as Local as Possible

Only lift state up when necessary. State should be kept as close as possible to where it's used:

```jsx
// ❌ Bad: State lifted too high
function ParentComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <OtherComponent />
      <ModalButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

// ✅ Good: State kept local to where it's needed
function ParentComponent() {
  return (
    <div>
      <OtherComponent />
      <ModalContainer />
    </div>
  );
}

function ModalContainer() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <ModalButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
```

### 2. Use Appropriate State Management Tools

Choose the right state management approach based on your application's needs:

- **Local component state**: For component-specific state
- **Context API**: For state shared across multiple components
- **Redux/MobX/Zustand**: For complex global state management
- **React Query/SWR**: For server state management

### 3. Separate UI State from Business Logic

Keep UI state (like form inputs, toggles) separate from business logic and data:

```jsx
// ❌ Bad: Mixing UI state with data
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    isFormValid: false,
    isSubmitting: false,
    showNameError: false
  });
  
  // ...
}

// ✅ Good: Separate UI state from data
function UserForm() {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [uiState, setUiState] = useState({
    isFormValid: false,
    isSubmitting: false,
    errors: {
      name: false,
      email: false
    }
  });
  
  // ...
}
```

## Performance Optimization

### 1. Use React.memo for Pure Functional Components

Memoize components that render often but with the same props:

```jsx
// Define a component that doesn't need to re-render often
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Complex rendering logic
  return <div>{/* ... */}</div>;
});

// Parent component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => generateData(), []); // Stable data reference
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <ExpensiveComponent data={data} />
    </div>
  );
}
```

### 2. Use Virtualization for Long Lists

When rendering long lists, use virtualization libraries like `react-window` or `react-virtualized`:

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {index}: {items[index]}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 3. Lazy Load Components

Use `React.lazy` and `Suspense` to load components only when needed:

```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavyComponent(true)}>
        Show Heavy Component
      </button>
      
      {showHeavyComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

### 4. Optimize Re-renders

Avoid unnecessary re-renders by:

- Using `useMemo` for expensive calculations
- Using `useCallback` for event handlers passed to child components
- Avoiding creating new objects or arrays in render

```jsx
// ❌ Bad: Creating new objects in render
function Component({ data }) {
  return (
    <ChildComponent 
      config={{ foo: 'bar' }} // New object on every render
      onSubmit={() => processData(data)} // New function on every render
    />
  );
}

// ✅ Good: Memoizing objects and callbacks
function Component({ data }) {
  // Memoize object
  const config = useMemo(() => ({ foo: 'bar' }), []);
  
  // Memoize callback
  const handleSubmit = useCallback(() => {
    processData(data);
  }, [data]);
  
  return (
    <ChildComponent 
      config={config}
      onSubmit={handleSubmit}
    />
  );
}
```

## Hooks Usage

### 1. Follow the Rules of Hooks

Always follow the two rules of Hooks:

- Only call Hooks at the top level (not inside loops, conditions, or nested functions)
- Only call Hooks from React function components or custom Hooks

```jsx
// ❌ Bad: Hook inside a condition
function Component() {
  const [name, setName] = useState('');
  
  if (name !== '') {
    useEffect(() => {
      // This violates the rules of Hooks
      document.title = name;
    }, [name]);
  }
  
  return <input value={name} onChange={e => setName(e.target.value)} />;
}

// ✅ Good: Condition inside the Hook
function Component() {
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (name !== '') {
      document.title = name;
    }
  }, [name]);
  
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

### 2. Create Custom Hooks for Reusable Logic

Extract reusable logic into custom Hooks:

```jsx
// Custom Hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const validate = () => {
    // Validation logic
    // ...
    return isValid;
  };
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };
  
  return { values, errors, handleChange, handleSubmit };
}

// Usage
function SignupForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });
  
  const submitForm = (formValues) => {
    // Submit logic
  };
  
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}
      
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### 3. Use Dependency Arrays Correctly

Always include all dependencies in useEffect, useMemo, and useCallback dependency arrays:

```jsx
// ❌ Bad: Missing dependencies
function Component({ id, onUpdate }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData(id).then(setData);
    // id is missing from dependencies
  }, []);
  
  const handleClick = useCallback(() => {
    onUpdate(id, data);
    // onUpdate and data are missing from dependencies
  }, [id]);
  
  // ...
}

// ✅ Good: All dependencies included
function Component({ id, onUpdate }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData(id).then(setData);
  }, [id]); // id included
  
  const handleClick = useCallback(() => {
    onUpdate(id, data);
  }, [id, onUpdate, data]); // All dependencies included
  
  // ...
}
```

## Props Handling

### 1. Use Prop Destructuring

Destructure props for cleaner code:

```jsx
// ❌ Bad: Not destructuring props
function UserProfile(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Email: {props.email}</p>
      <p>Role: {props.role}</p>
    </div>
  );
}

// ✅ Good: Destructuring props
function UserProfile({ name, email, role }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}
```

### 2. Use Default Props

Provide default values for props:

```jsx
// Using default parameters (function components)
function Button({ type = 'button', children, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}

// Or using defaultProps (works with class components too)
Button.defaultProps = {
  type: 'button'
};
```

### 3. Use PropTypes or TypeScript

Validate props with PropTypes or TypeScript:

```jsx
// Using PropTypes
import PropTypes from 'prop-types';

function UserProfile({ name, email, role }) {
  // ...
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['admin', 'user', 'guest']).isRequired
};

// Using TypeScript
type UserProfileProps = {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
};

function UserProfile({ name, email, role }: UserProfileProps) {
  // ...
}
```

## Error Handling

### 1. Use Error Boundaries

Implement error boundaries to catch and handle errors:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error in header</p>}>
        <Header />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<p>Error in content</p>}>
        <Content />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<p>Error in footer</p>}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
```

### 2. Handle Async Errors Properly

Properly handle errors in async operations:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## Testing

### 1. Write Tests for Components

Test your components using React Testing Library:

```jsx
// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. Test Behavior, Not Implementation

Focus on testing component behavior rather than implementation details:

```jsx
// ❌ Bad: Testing implementation details
test('sets isOpen state to true when button is clicked', () => {
  const { getByText } = render(<Modal />);
  const button = getByText('Open Modal');
  
  fireEvent.click(button);
  
  // This is testing implementation details (state)
  expect(Modal.prototype.state.isOpen).toBe(true);
});

// ✅ Good: Testing behavior
test('shows modal content when button is clicked', () => {
  const { getByText, queryByText } = render(<Modal />);
  
  // Modal content should not be visible initially
  expect(queryByText('Modal Content')).not.toBeInTheDocument();
  
  // Click the button
  fireEvent.click(getByText('Open Modal'));
  
  // Modal content should now be visible
  expect(getByText('Modal Content')).toBeInTheDocument();
});
```

### 3. Use Mock Functions and Services

Mock external dependencies in your tests:

```jsx
// UserProfile.test.js
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

// Mock fetch
global.fetch = jest.fn();

test('displays user data when fetch succeeds', async () => {
  // Mock successful response
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: 'John Doe', email: 'john@example.com' })
  });
  
  render(<UserProfile userId={1} />);
  
  // Should show loading initially
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for user data to be displayed
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });
  
  // Verify fetch was called correctly
  expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
});

test('displays error when fetch fails', async () => {
  // Mock failed response
  global.fetch.mockRejectedValueOnce(new Error('Network error'));
  
  render(<UserProfile userId={1} />);
  
  // Wait for error to be displayed
  await waitFor(() => {
    expect(screen.getByText('Error: Network error')).toBeInTheDocument();
  });
});
```

## Accessibility

### 1. Use Semantic HTML

Use the correct HTML elements for their intended purpose:

```jsx
// ❌ Bad: Using divs for everything
function Button({ onClick, children }) {
  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  );
}

// ✅ Good: Using semantic elements
function Button({ onClick, children, disabled }) {
  return (
    <button 
      className="button" 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### 2. Add Proper ARIA Attributes

Use ARIA attributes when necessary:

```jsx
function Dropdown({ label, options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  
  return (
    <div>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span id={`${id}-label`}>{label}</span>
        <span>{selected}</span>
      </button>
      
      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={-1}
        >
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 3. Ensure Keyboard Navigation

Make sure your components are usable with keyboard navigation:

```jsx
function TabList({ tabs, activeTab, onChange }) {
  return (
    <div role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(e) => {
            // Handle arrow key navigation
            if (e.key === 'ArrowRight') {
              const nextIndex = (index + 1) % tabs.length;
              onChange(tabs[nextIndex].id);
            } else if (e.key === 'ArrowLeft') {
              const prevIndex = (index - 1 + tabs.length) % tabs.length;
              onChange(tabs[prevIndex].id);
            }
          }}
        >
          {tab.label}
        </button>
      ))}
      
      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

## Code Style and Formatting

### 1. Use ESLint and Prettier

Set up ESLint and Prettier to enforce consistent code style:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 2. Use Consistent Import Order

Organize your imports in a consistent way:

```jsx
// External imports first, sorted alphabetically
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Internal imports next, sorted alphabetically
import { useAuth } from '../../hooks/useAuth';
import { fetchUserData } from '../../services/api';

// Style imports last
import './UserProfile.css';
```

### 3. Follow a Component File Structure

Use a consistent structure for your component files:

```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Component definition
function UserProfile({ userId }) {
  // 3. Hooks
  const [user, setUser] = useState(null);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, [userId]);
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Helper functions
  const formatDate = (date) => {
    // Formatting logic
  };
  
  // 7. Render logic
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 8. PropTypes
UserProfile.propTypes = {
  userId: PropTypes.string.isRequired
};

// 9. Default props (if needed)
UserProfile.defaultProps = {
  // Default props
};

// 10. Export
export default UserProfile;
```

## Security

### 1. Prevent XSS Attacks

React automatically escapes values embedded in JSX, but be careful with:

```jsx
// ❌ Bad: Using dangerouslySetInnerHTML without sanitization
function Comment({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ✅ Good: Sanitizing content before using dangerouslySetInnerHTML
import DOMPurify from 'dompurify';

function Comment({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
```

### 2. Validate and Sanitize User Input

Always validate and sanitize user input, especially when sending it to APIs:

```jsx
function SearchForm() {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate and sanitize input
    const sanitizedQuery = query.trim();
    
    if (sanitizedQuery) {
      // Perform search with sanitized query
      searchApi(sanitizedQuery);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

### 3. Use HTTPS for API Calls

Always use HTTPS for API calls and external resources:

```jsx
// ❌ Bad: Using HTTP
fetch('http://api.example.com/data');

// ✅ Good: Using HTTPS
fetch('https://api.example.com/data');

// ✅ Better: Using relative URLs when possible
fetch('/api/data');
```

## Performance Monitoring

### 1. Use React DevTools Profiler

The React DevTools Profiler is essential for identifying performance issues:

1. Install the React DevTools browser extension
2. Open DevTools and go to the "Profiler" tab
3. Click "Record" and interact with your app
4. Analyze the results to identify components that render too often or take too long to render

### 2. Implement Performance Monitoring

Use tools like Lighthouse, WebPageTest, or commercial monitoring solutions to track your application's performance:

```jsx
// Example of using the User Timing API for custom performance marks
function ExpensiveComponent() {
  useEffect(() => {
    // Mark the start of an expensive operation
    performance.mark('expensive-calculation-start');
    
    // Perform expensive calculation
    const result = performExpensiveCalculation();
    
    // Mark the end and measure
    performance.mark('expensive-calculation-end');
    performance.measure(
      'expensive calculation',
      'expensive-calculation-start',
      'expensive-calculation-end'
    );
    
    // Log the measurement
    const measurements = performance.getEntriesByName('expensive calculation');
    console.log('Calculation took:', measurements[0].duration, 'ms');
  }, []);
  
  // ...
}
```

## Deployment and Build Optimization

### 1. Use Production Builds

Always use production builds for deployment:

```bash
# Create React App
npm run build

# Next.js
npm run build
npm run start

# Vite
npm run build
```

### 2. Implement Code Splitting

Use code splitting to reduce initial bundle size:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 3. Optimize Images and Assets

Use optimized images and assets:

```jsx
// Use responsive images
function ResponsiveImage({ src, alt }) {
  return (
    <img
      src={`${src}-small.jpg`}
      srcSet={`
        ${src}-small.jpg 500w,
        ${src}-medium.jpg 1000w,
        ${src}-large.jpg 2000w
      `}
      sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"
      alt={alt}
      loading="lazy" // Lazy load images
    />
  );
}
```

## Documentation

### 1. Document Components with JSDoc

Use JSDoc to document your components:

```jsx
/**
 * Button component with different variants and sizes.
 *
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant ('primary', 'secondary', 'danger')
 * @param {string} [props.size='medium'] - Button size ('small', 'medium', 'large')
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Button component
 */
function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) {
  // ...
}
```

### 2. Create a Component Library or Storybook

Document your components with Storybook:

```jsx
// Button.stories.js
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'danger'] }
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] }
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button'
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'Danger Button'
};
```

### 3. Maintain a README and CHANGELOG

Keep your project documentation up to date:

```markdown
# My React App

## Overview
Brief description of the project.

## Getting Started
Instructions for setting up and running the project.

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
git clone https://github.com/username/my-react-app.git
cd my-react-app
npm install
npm start
```

## Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Runs the test suite
- `npm run build`: Builds the app for production

## Project Structure
Overview of the project structure and organization.

## Contributing
Guidelines for contributing to the project.

## License
Information about the project license.
```

By following these best practices, you'll create React applications that are maintainable, performant, and scalable. These practices will not only make your code better but also demonstrate your expertise in React development during technical interviews.
# Interview Preparation Tips

This section provides guidance on how to prepare for React interviews, including common questions, coding challenges, and system design considerations.

## Common React Interview Questions

Here are some of the most frequently asked React interview questions, along with concise answers:

### 1. What is React and what are its key features?

**Answer:** React is a JavaScript library for building user interfaces, particularly single-page applications. Its key features include:
- Virtual DOM for optimized rendering
- Component-based architecture
- Declarative UI development
- Unidirectional data flow
- JSX syntax
- React Native for mobile development
- Rich ecosystem and community support

### 2. What is the difference between functional and class components?

**Answer:** 
- **Functional Components**: JavaScript functions that accept props and return React elements. With hooks, they can now use state and lifecycle features.
- **Class Components**: ES6 classes that extend React.Component and have access to state, lifecycle methods, and can store references.

Functional components are now preferred due to hooks, simpler syntax, better performance, and easier testing.

### 3. Explain the Virtual DOM and how it works.

**Answer:** The Virtual DOM is a lightweight copy of the actual DOM in memory. When state changes in a React component:
1. React creates a new Virtual DOM tree
2. It compares this new tree with the previous one (diffing)
3. It calculates the minimal number of operations needed to update the real DOM
4. It updates only the necessary parts of the actual DOM

This process is more efficient than directly manipulating the DOM for every change.

### 4. What are props in React?

**Answer:** Props (short for properties) are read-only inputs to components. They are passed from parent to child components and help make components reusable. Props cannot be modified within a component (immutability principle).

### 5. What is state in React and how is it different from props?

**Answer:**
- **State** is a JavaScript object that represents the internal data of a component that can change over time.
- **Props** are passed from parent to child and are read-only within the component.

Key differences:
- State is managed within the component; props are passed to the component
- State can be changed; props are immutable
- State changes trigger re-renders; new props from parent also trigger re-renders

### 6. Explain the component lifecycle in React.

**Answer:** In class components, the lifecycle has three phases:
1. **Mounting**: constructor → getDerivedStateFromProps → render → componentDidMount
2. **Updating**: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
3. **Unmounting**: componentWillUnmount

In functional components with hooks, useEffect replaces most lifecycle methods:
- `useEffect(() => {}, [])` for componentDidMount
- `useEffect(() => {})` for componentDidMount and componentDidUpdate
- `useEffect(() => { return () => {} }, [])` for componentWillUnmount

### 7. What are React Hooks and why were they introduced?

**Answer:** Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced to:
- Allow using state and other React features without writing classes
- Make it easier to reuse stateful logic between components
- Organize related logic in one place instead of splitting across lifecycle methods
- Avoid the complexity of this keyword and binding

Common hooks include useState, useEffect, useContext, useReducer, useRef, useMemo, and useCallback.

### 8. Explain the useState hook.

**Answer:** useState is a hook that lets you add state to functional components:
```jsx
const [state, setState] = useState(initialValue);
```
- It returns an array with the current state value and a function to update it
- When the update function is called, the component re-renders
- Unlike this.setState in class components, useState does not automatically merge objects

### 9. What is the useEffect hook and how does it work?

**Answer:** useEffect lets you perform side effects in functional components:
```jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```
- It runs after every render by default
- The dependency array controls when the effect runs:
  - Empty array (`[]`): Runs only on mount and unmount
  - With dependencies: Runs when any dependency changes
  - No array: Runs after every render
- The cleanup function runs before the component unmounts or before the effect runs again

### 10. What is the Context API and when would you use it?

**Answer:** Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's useful for:
- Theming (dark/light mode)
- User authentication data
- Localization/language preferences
- Any data that many components need

It consists of:
- `React.createContext()`: Creates a Context object
- `Context.Provider`: Provides the value to components
- `Context.Consumer` or `useContext` hook: Consumes the context value

### 11. What is Redux and when would you use it over Context?

**Answer:** Redux is a state management library that provides a predictable state container. Consider Redux over Context when:
- You have complex state logic that involves multiple sub-values
- The state is updated frequently
- The logic to update state is complex
- The application has a medium to large-sized codebase with many components
- You need powerful developer tools for debugging
- You need middleware for handling side effects
- You want a strict pattern for state updates

### 12. Explain code splitting in React.

**Answer:** Code splitting is a technique to split your code into smaller chunks that can be loaded on demand, improving initial load performance. In React, it's implemented using:
```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```
This is particularly useful for:
- Route-based code splitting
- Component-based splitting for large components not needed immediately
- Reducing initial bundle size in large applications

### 13. What are Error Boundaries in React?

**Answer:** Error Boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI. They're created using class components with either `getDerivedStateFromError()` or `componentDidCatch()` lifecycle methods:
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
Error boundaries only catch errors in the components below them in the tree and don't catch errors in event handlers, asynchronous code, or in the error boundary itself.

### 14. What are keys in React lists and why are they important?

**Answer:** Keys are special string attributes used when creating lists of elements. They help React identify which items have changed, been added, or been removed:
```jsx
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```
Keys should be:
- Unique among siblings
- Stable (not change on re-renders)
- Preferably from your data (like IDs)

Using indexes as keys is not recommended unless the list is static and will never reorder.

### 15. What is the difference between controlled and uncontrolled components?

**Answer:**
- **Controlled Components**: Form elements whose values are controlled by React state. Every state mutation has an associated handler function:
  ```jsx
  function ControlledInput() {
    const [value, setValue] = useState('');
    return <input value={value} onChange={e => setValue(e.target.value)} />;
  }
  ```

- **Uncontrolled Components**: Form elements that maintain their own internal state:
  ```jsx
  function UncontrolledInput() {
    const inputRef = useRef(null);
    const handleSubmit = () => {
      console.log(inputRef.current.value);
    };
    return <input ref={inputRef} defaultValue="default value" />;
  }
  ```

Controlled components are preferred as they provide more control and make form validation easier.

### 16. What is prop drilling and how can you avoid it?

**Answer:** Prop drilling occurs when props need to be passed through multiple levels of components that don't need those props but only pass them down to lower components.

Solutions to avoid prop drilling:
1. **Context API**: Create a context for data needed by many components
2. **Redux or other state management libraries**: For more complex state
3. **Component composition**: Restructure components to avoid deep nesting
4. **Custom hooks**: Extract and share stateful logic

### 17. Explain the useMemo and useCallback hooks.

**Answer:**
- **useMemo**: Memoizes a computed value, recalculating only when dependencies change:
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

- **useCallback**: Returns a memoized callback function that only changes if dependencies change:
  ```jsx
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);
  ```

Both are performance optimization hooks:
- useMemo prevents expensive recalculations
- useCallback prevents unnecessary re-renders when passing callbacks to optimized child components

### 18. What is React.memo and when would you use it?

**Answer:** React.memo is a higher-order component that memoizes a component, preventing re-renders if props haven't changed:
```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // render using props
});
```
Use it when:
- Component renders often with the same props
- Component is pure (output depends only on props)
- Component is relatively expensive to render

It performs a shallow comparison of props by default, but you can provide a custom comparison function.

### 19. How do you handle API calls in React?

**Answer:** Common patterns for API calls in React:

1. **Using useEffect with fetch or axios**:
   ```jsx
   function DataComponent() {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
     useEffect(() => {
       const fetchData = async () => {
         try {
           setLoading(true);
           const response = await fetch('https://api.example.com/data');
           const result = await response.json();
           setData(result);
         } catch (err) {
           setError(err);
         } finally {
           setLoading(false);
         }
       };
       
       fetchData();
     }, []);
     
     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;
     if (!data) return null;
     
     return <div>{/* Render data */}</div>;
   }
   ```

2. **Using data fetching libraries** like React Query, SWR, or Apollo Client for more complex scenarios

3. **Custom hooks** to encapsulate fetching logic:
   ```jsx
   function useFetch(url) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
     useEffect(() => {
       // Fetching logic
     }, [url]);
     
     return { data, loading, error };
   }
   ```

### 20. How do you optimize performance in a React application?

**Answer:** Key performance optimization techniques:

1. **Use production builds** for deployment
2. **Implement code splitting** with React.lazy and Suspense
3. **Memoize expensive calculations** with useMemo
4. **Prevent unnecessary re-renders** with:
   - React.memo for function components
   - PureComponent for class components
   - useCallback for event handlers
5. **Virtualize long lists** with react-window or react-virtualized
6. **Lazy load images and components**
7. **Optimize bundle size** by:
   - Analyzing with tools like Webpack Bundle Analyzer
   - Tree shaking
   - Using smaller alternatives to large libraries
8. **Implement proper keys** for list items
9. **Avoid anonymous functions** in render methods
10. **Use web workers** for CPU-intensive tasks

## Coding Challenges

Here are some common React coding challenges you might encounter in interviews:

### 1. Build a Counter Component

**Task:** Create a counter component with increment, decrement, and reset functionality.

**Solution:**
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

### 2. Create a Todo List

**Task:** Build a simple todo list with add, toggle, and delete functionality.

**Solution:**
```jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ 
              marginLeft: '8px',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 'auto' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

### 3. Implement a Search Filter

**Task:** Create a component that filters a list based on search input.

**Solution:**
```jsx
import React, { useState, useMemo } from 'react';

function SearchFilter({ items }) {
  const [query, setQuery] = useState('');
  
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Example usage
function App() {
  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Elderberry' }
  ];
  
  return <SearchFilter items={items} />;
}

export default App;
```

### 4. Build a Form with Validation

**Task:** Create a form with validation for email and password fields.

**Solution:**
```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default LoginForm;
```

### 5. Implement a Modal Component

**Task:** Create a reusable modal component that can be opened and closed.

**Solution:**
```jsx
import React, { useEffect } from 'react';
import './Modal.css'; // You would need to create this CSS file

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Example usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

// CSS for the modal (Modal.css)
/*
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}
*/

export default App;
```

## System Design with React

When asked to design a system or application using React in an interview, follow these steps:

### 1. Requirements Clarification

Start by clarifying the requirements:
- What are the core features?
- Who are the users?
- What are the performance expectations?
- Are there any specific technical constraints?
- What scale does the application need to support?

### 2. Component Hierarchy

Design the component hierarchy:
- Identify the main components
- Determine parent-child relationships
- Decide which components are reusable
- Consider where state should live

Example for an e-commerce product page:
```
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   ├── Navigation
│   └── CartIcon
├── ProductPage
│   ├── ProductGallery
│   │   ├── MainImage
│   │   └── ThumbnailList
│   ├── ProductInfo
│   │   ├── Title
│   │   ├── Price
│   │   ├── Rating
│   │   └── Description
│   ├── ProductOptions
│   │   ├── ColorSelector
│   │   └── SizeSelector
│   └── AddToCartButton
└── Footer
    ├── Links
    └── Copyright
```

### 3. State Management

Determine how to manage state:
- What data needs to be stored?
- Where should each piece of state live?
- Do you need global state management?
- How will data flow between components?

For example:
- Local component state for UI elements (using useState)
- Context API for theme, user authentication
- Redux for complex global state
- React Query for server state

### 4. Data Fetching Strategy

Plan how data will be fetched:
- REST API vs GraphQL
- When to fetch data (on mount, on user action)
- How to handle loading and error states
- Caching strategy
- Authentication and authorization

### 5. Routing Structure

Design the routing structure:
- What are the main routes?
- Are there nested routes?
- How will you handle protected routes?
- What about 404 pages?

Example using React Router:
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### 6. Performance Considerations

Address performance concerns:
- Code splitting for large applications
- Lazy loading for components not needed immediately
- Memoization for expensive calculations
- Virtualization for long lists
- Image optimization
- Bundle size optimization

### 7. Deployment and Infrastructure

Consider deployment strategy:
- Static site vs server-rendered
- CDN for static assets
- CI/CD pipeline
- Environment configuration
- Monitoring and error tracking

### 8. Testing Strategy

Plan for testing:
- Unit tests for individual components
- Integration tests for component interactions
- End-to-end tests for critical user flows
- What testing libraries will you use?

### Example: Designing a Twitter Clone

**Requirements:**
- Users can post tweets (text, images)
- Users can follow other users
- Home timeline shows tweets from followed users
- Users can like and retweet
- Notifications for interactions

**Component Hierarchy:**
```
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── UserMenu
├── Sidebar
│   ├── Navigation
│   └── TrendingTopics
├── MainContent
│   ├── TweetComposer
│   └── Timeline
│       └── Tweet
│           ├── TweetHeader
│           ├── TweetContent
│           └── TweetActions
└── RightSidebar
    ├── WhoToFollow
    └── NewsWidget
```

**State Management:**
- User authentication: Context API
- Tweet data and interactions: Redux
- UI state (modals, dropdowns): Local component state
- Real-time updates: WebSockets

**Data Fetching:**
- REST API for CRUD operations
- Infinite scrolling for timeline
- Optimistic updates for likes/retweets
- Polling or WebSockets for real-time notifications

**Routing:**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/messages" element={<Messages />} />
  <Route path="/profile/:username" element={<Profile />} />
  <Route path="/tweet/:id" element={<TweetDetail />} />
</Routes>
```

**Performance Considerations:**
- Virtualized list for timeline
- Lazy loading images
- Code splitting by route
- Memoization for expensive components
- Debouncing for search input

**Deployment:**
- Next.js for server-side rendering
- Vercel or Netlify for hosting
- CDN for static assets
- Redis for caching
- MongoDB for database

By following this structured approach to system design with React, you'll demonstrate your ability to think through complex problems and create scalable, maintainable applications.
# Conclusion

This React JS Toolbook has provided a comprehensive overview of React, from its fundamental concepts to advanced techniques, best practices, and the broader ecosystem. As you prepare for your React interviews, this guide should serve as a valuable reference to help you understand the key concepts and demonstrate your expertise.

## Key Takeaways

### React's Core Philosophy

At its heart, React is built around a few key principles:

1. **Component-Based Architecture**: Breaking UIs into reusable, composable components that manage their own state.

2. **Declarative Approach**: Describing what your UI should look like based on the current state, rather than imperatively manipulating the DOM.

3. **Unidirectional Data Flow**: Data flows down from parent to child components, making applications more predictable and easier to debug.

4. **Virtual DOM**: An efficient, in-memory representation of the real DOM that optimizes rendering performance.

### Modern React Development

Modern React development has evolved significantly since the library's introduction:

1. **Hooks-Based Development**: Functional components with hooks have largely replaced class components, providing a more concise and flexible way to use React features.

2. **Rich Ecosystem**: The React ecosystem offers solutions for every aspect of application development, from state management to routing, form handling, and more.

3. **Performance Optimization**: React provides various tools and patterns for optimizing performance, from memoization to code splitting and lazy loading.

4. **Server-Side Rendering and Static Site Generation**: Frameworks like Next.js and Gatsby extend React's capabilities to improve performance and SEO.

### Preparing for Interviews

When preparing for React interviews, focus on:

1. **Core Concepts**: Ensure you have a solid understanding of components, props, state, lifecycle, and hooks.

2. **Problem-Solving Skills**: Practice implementing common UI patterns and solving coding challenges with React.

3. **Performance Optimization**: Be ready to discuss how to identify and resolve performance issues in React applications.

4. **System Design**: Understand how to architect larger applications with appropriate component structure and state management.

5. **Best Practices**: Demonstrate your knowledge of React best practices, including code organization, testing, and accessibility.

## Staying Current

React continues to evolve, with new features and best practices emerging regularly. To stay current:

1. **Follow Official Resources**: Keep an eye on the official React blog, documentation, and GitHub repository.

2. **Engage with the Community**: Participate in React communities on platforms like Twitter, Reddit, and Discord.

3. **Explore New Tools and Libraries**: Experiment with new tools and libraries in the React ecosystem.

4. **Build Projects**: The best way to learn is by building. Create personal projects to practice new concepts and techniques.

## Final Thoughts

React has revolutionized the way we build user interfaces on the web, providing a powerful and flexible library for creating interactive applications. By mastering React and its ecosystem, you'll be well-equipped to tackle a wide range of web development challenges and succeed in technical interviews.

Remember that becoming proficient in React is a journey. Continue to practice, learn, and build, and you'll develop the expertise needed to excel in your React development career.

Good luck with your interviews!
# References

This section provides a list of valuable resources for further learning about React and its ecosystem.

## Official Documentation

- [React Official Documentation](https://react.dev/) - The official React documentation, completely rewritten in 2023 with comprehensive guides and API references.
- [React GitHub Repository](https://github.com/facebook/react) - The official React source code and issue tracker.
- [Create React App Documentation](https://create-react-app.dev/) - Documentation for Create React App, the officially supported way to create single-page React applications.
- [React Native Documentation](https://reactnative.dev/) - The official documentation for React Native, for building mobile applications.

## State Management

- [Redux Documentation](https://redux.js.org/) - Official documentation for Redux, a predictable state container for JavaScript apps.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.
- [MobX Documentation](https://mobx.js.org/) - Documentation for MobX, a simple, scalable state management library.
- [Zustand Documentation](https://github.com/pmndrs/zustand) - Documentation for Zustand, a small, fast, and scalable state management solution.
- [Recoil Documentation](https://recoiljs.org/) - Documentation for Recoil, a state management library for React developed by Facebook.

## Routing

- [React Router Documentation](https://reactrouter.com/) - Documentation for React Router, the standard routing library for React.
- [Next.js Documentation](https://nextjs.org/docs) - Documentation for Next.js, a React framework with routing built-in.

## UI Component Libraries

- [Material-UI Documentation](https://mui.com/) - Documentation for Material-UI, a popular React UI framework implementing Google's Material Design.
- [Chakra UI Documentation](https://chakra-ui.com/) - Documentation for Chakra UI, a simple, modular, and accessible component library.
- [Ant Design Documentation](https://ant.design/) - Documentation for Ant Design, an enterprise-class UI design language and React UI library.
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Documentation for Tailwind CSS, a utility-first CSS framework that can be used with React.

## Data Fetching

- [React Query Documentation](https://tanstack.com/query/latest) - Documentation for React Query, a data-fetching and state management library.
- [SWR Documentation](https://swr.vercel.app/) - Documentation for SWR, a React Hooks library for data fetching.
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/) - Documentation for Apollo Client, a comprehensive state management library for GraphQL.

## Testing

- [Jest Documentation](https://jestjs.io/) - Documentation for Jest, a JavaScript testing framework.
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/) - Documentation for React Testing Library, a set of helpers for testing React components.
- [Cypress Documentation](https://docs.cypress.io/) - Documentation for Cypress, an end-to-end testing framework.

## Form Handling

- [Formik Documentation](https://formik.org/) - Documentation for Formik, a form library for React.
- [React Hook Form Documentation](https://react-hook-form.com/) - Documentation for React Hook Form, a performant, flexible and extensible forms library.
- [Yup Documentation](https://github.com/jquense/yup) - Documentation for Yup, a schema builder for runtime value parsing and validation.

## Animation

- [React Spring Documentation](https://www.react-spring.dev/) - Documentation for React Spring, a spring-physics based animation library.
- [Framer Motion Documentation](https://www.framer.com/motion/) - Documentation for Framer Motion, a production-ready motion library for React.

## Server-Side Rendering and Static Site Generation

- [Next.js Documentation](https://nextjs.org/docs) - Documentation for Next.js, a React framework for production.
- [Gatsby Documentation](https://www.gatsbyjs.com/docs/) - Documentation for Gatsby, a React-based framework for building static sites.

## Books

- "React Up and Running" by Stoyan Stefanov
- "Learning React" by Alex Banks and Eve Porcello
- "React Design Patterns and Best Practices" by Michele Bertoli
- "Full Stack React, TypeScript, and Node" by David Choi
- "React Cookbook" by David Griffiths and Dawn Griffiths

## Courses and Tutorials

- [React - The Complete Guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) by Maximilian Schwarzmüller (Udemy)
- [Epic React](https://epicreact.dev/) by Kent C. Dodds
- [React for Beginners](https://reactforbeginners.com/) by Wes Bos
- [The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react) by Kent C. Dodds (Egghead.io)
- [Scrimba React Course](https://scrimba.com/learn/learnreact) by Bob Ziroll

## Blogs and Newsletters

- [React Blog](https://react.dev/blog) - The official React blog
- [Overreacted](https://overreacted.io/) - Personal blog by Dan Abramov, a member of the React team
- [Kent C. Dodds Blog](https://kentcdodds.com/blog) - Blog by Kent C. Dodds, focusing on React and testing
- [React Newsletter](https://reactnewsletter.com/) - A weekly newsletter about React and the React ecosystem
- [React Status](https://react.statuscode.com/) - A weekly roundup of the latest React and React Native links and tutorials

## Community Resources

- [React Subreddit](https://www.reddit.com/r/reactjs/) - Reddit community for React developers
- [Reactiflux](https://www.reactiflux.com/) - Discord community for React developers
- [Stack Overflow React Tag](https://stackoverflow.com/questions/tagged/reactjs) - Questions tagged with React on Stack Overflow
- [DEV.to React Tag](https://dev.to/t/react) - Articles tagged with React on DEV.to

These resources provide a wealth of information for learning React and staying up-to-date with the latest developments in the React ecosystem. Whether you're preparing for interviews or building React applications, these references will help you deepen your understanding and improve your skills.
# React JS: JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML or XML. It's a core part of React that allows you to write HTML-like code in your JavaScript files. While JSX is not required to use React, it makes React code more readable and easier to write.

## What is JSX?

JSX is a syntax extension that allows you to write elements in JavaScript that look like HTML. For example:

```jsx
const element = <h1>Hello, world!</h1>;
```

This is neither a string nor HTML. It's JSX, and it's a syntax extension to JavaScript. JSX produces React "elements" that are then rendered to the DOM.

## Why JSX?

React embraces the fact that rendering logic is inherently coupled with UI logic: how events are handled, how state changes over time, and how data is prepared for display. Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called "components" that contain both.

JSX allows React to show more useful error and warning messages. By using JSX, you can see HTML and JavaScript side by side, making it easier to visualize the structure of your UI.

## JSX Rules and Syntax

### 1. JSX Elements

JSX elements look like HTML but are actually JavaScript expressions. They can be stored in variables, passed as arguments, and returned from functions:

```jsx
const greeting = <h1>Hello, React!</h1>;

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user.name}!</h1>;
  }
  return <h1>Hello, Stranger!</h1>;
}
```

### 2. JSX Attributes

You can use attributes with JSX elements, similar to HTML. However, since JSX is closer to JavaScript than HTML, React DOM uses camelCase property naming convention instead of HTML attribute names:

```jsx
const element = <div className="container" tabIndex="0"></div>;
```

Note that `class` becomes `className` in JSX, and `tabindex` becomes `tabIndex`.

### 3. JSX Children

JSX elements can have children, just like HTML elements:

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <p>This is a paragraph.</p>
  </div>
);
```

### 4. JavaScript Expressions in JSX

You can embed any JavaScript expression in JSX by wrapping it in curly braces `{}`:

```jsx
const name = 'John Doe';
const element = <h1>Hello, {name}!</h1>;

const user = { firstName: 'Jane', lastName: 'Doe' };
const element = <h1>Hello, {user.firstName} {user.lastName}!</h1>;

const element = <h1>2 + 2 = {2 + 2}</h1>;
```

### 5. JSX is an Expression Too

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means you can use JSX inside if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user.name}!</h1>;
  }
  return <h1>Hello, Stranger!</h1>;
}
```

### 6. Specifying Attributes with JSX

You can use quotes to specify string literals as attributes:

```jsx
const element = <div tabIndex="0"></div>;
```

Or you can use curly braces to embed a JavaScript expression in an attribute:

```jsx
const element = <img src={user.avatarUrl}></img>;
```

### 7. JSX Prevents Injection Attacks

It's safe to embed user input in JSX because React DOM escapes any values embedded in JSX before rendering them. This helps prevent cross-site scripting (XSS) attacks.

## JSX Compilation

JSX is not understood by browsers directly. It needs to be transpiled into regular JavaScript using tools like Babel. When compiled, JSX transforms into `React.createElement()` function calls:

```jsx
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiled JavaScript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

The `React.createElement()` function creates an object like this:

```javascript
// Simplified structure
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

These objects are called "React elements" and describe what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

## JSX Fragments

Sometimes you need to return multiple elements from a component, but JSX requires a single parent element. To avoid adding unnecessary divs to your DOM, you can use React Fragments:

```jsx
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

The empty tags `<>` and `</>` are shorthand for `<React.Fragment>` and `</React.Fragment>`.

## JSX Best Practices

1. **Use parentheses for multi-line JSX**: This improves readability and avoids issues with automatic semicolon insertion.

```jsx
const element = (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);
```

2. **Use camelCase for attributes**: HTML attributes like `class` and `tabindex` become `className` and `tabIndex` in JSX.

3. **Close all tags**: JSX requires all tags to be closed, either with a closing tag (`<div></div>`) or self-closing tag (`<img />`).

4. **Use curly braces for JavaScript expressions**: Any JavaScript expression can be placed within curly braces in JSX.

5. **Use conditional rendering**: You can use JavaScript operators like `&&` and the ternary operator for conditional rendering.

```jsx
{isLoggedIn && <LogoutButton />}
{isLoggedIn ? <LogoutButton /> : <LoginButton />}
```

JSX is a powerful feature of React that makes it more intuitive to work with UI elements in JavaScript. Understanding JSX is fundamental to becoming proficient with React.
# React JS: Components

Components are the building blocks of React applications. They are reusable, self-contained pieces of code that return React elements describing what should appear on the screen. Components allow you to split the UI into independent, reusable pieces, and think about each piece in isolation.

## Types of Components

In React, there are two primary ways to define components:

1. **Function Components**: These are simpler and more modern. They are JavaScript functions that accept props as an argument and return React elements.

2. **Class Components**: These are ES6 classes that extend from `React.Component` and require a `render()` method that returns React elements.

### Function Components

Function components are the simplest way to declare a component in React:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

With ES6 arrow functions, they can be even more concise:

```jsx
const Welcome = (props) => <h1>Hello, {props.name}</h1>;
```

### Class Components

Class components offer more features but require more code:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## Component Composition

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all of these are commonly expressed as components.

```jsx
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

## Props

Props (short for "properties") are a way of passing data from parent to child components. They are read-only and help make your components reusable:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />
```

In class components, props are accessed through `this.props`:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Props are Read-Only

A component must never modify its own props. React is flexible but has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Pure functions don't attempt to change their inputs, and always return the same result for the same inputs.

## State

While props are passed to the component (similar to function parameters), state is managed within the component (similar to variables declared within a function). State allows React components to change their output over time in response to user actions, network responses, and anything else.

### State in Class Components

In a class component, you can initialize state in the constructor and then use `setState()` to update it:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.increment}>
          Click me
        </button>
      </div>
    );
  }
}
```

### State in Function Components with Hooks

With the introduction of Hooks in React 16.8, function components can now use state:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### State Updates May Be Asynchronous

React may batch multiple `setState()` calls for performance reasons. Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state:

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### State Updates are Merged

When you call `setState()`, React merges the object you provide into the current state:

```jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

## Lifecycle Methods

Class components have several "lifecycle methods" that you can override to run code at particular times in the process:

### Mounting

These methods are called when an instance of a component is being created and inserted into the DOM:

- `constructor()`
- `static getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`

### Updating

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`

### Unmounting

This method is called when a component is being removed from the DOM:

- `componentWillUnmount()`

### Error Handling

These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component:

- `static getDerivedStateFromError()`
- `componentDidCatch()`

## Component Design Principles

### Single Responsibility Principle

Ideally, a component should do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

### DRY (Don't Repeat Yourself)

If you find yourself writing similar component code in multiple places, consider creating a more generic component that accepts props to handle the variations.

### Composition over Inheritance

React has a powerful composition model, and it's recommended to use composition instead of inheritance to reuse code between components.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

Components are the heart of React's reusable code philosophy. By mastering components, props, state, and lifecycle methods, you'll have a solid foundation for building React applications.
# React JS: Rendering and Lifecycle

Understanding how React renders components and manages their lifecycle is crucial for building efficient React applications. This section covers the rendering process, component lifecycle, and how to optimize rendering performance.

## Rendering Elements

React elements are the smallest building blocks of React apps. An element describes what you want to see on the screen:

```jsx
const element = <h1>Hello, world</h1>;
```

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

### Rendering an Element into the DOM

Let's say there is a `<div>` somewhere in your HTML file:

```html
<div id="root"></div>
```

We call this a "root" DOM node because everything inside it will be managed by React DOM.

To render a React element into a root DOM node, pass both to `ReactDOM.createRoot()`:

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
```

### Updating the Rendered Element

React elements are immutable. Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`:

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

In practice, most React apps only call `root.render()` once. In the next sections, we'll learn how to make components "stateful" so they can update in response to user actions and other events without explicitly calling `render()`.

### React Only Updates What's Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents have changed gets updated by React DOM.

## Component Lifecycle

### Class Component Lifecycle

Class components have several "lifecycle methods" that you can override to run code at particular times in the process:

#### Mounting

These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

1. **constructor()**: Called before anything else, when the component is initialized. Used to set up the initial state and bind methods.

```jsx
constructor(props) {
  super(props);
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

2. **static getDerivedStateFromProps(props, state)**: Called right before rendering when new props or state are being received. Rarely used.

```jsx
static getDerivedStateFromProps(props, state) {
  if (props.count !== state.lastPropsCount) {
    return {
      derivedCount: props.count * 2,
      lastPropsCount: props.count
    };
  }
  return null;
}
```

3. **render()**: The only required method in a class component. Examines `this.props` and `this.state` and returns React elements, arrays, portals, strings, numbers, booleans, or null.

```jsx
render() {
  return <div>{this.state.counter}</div>;
}
```

4. **componentDidMount()**: Called immediately after a component is mounted (inserted into the tree). Ideal for network requests, subscriptions, or DOM manipulations.

```jsx
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

#### Updating

An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:

1. **static getDerivedStateFromProps(props, state)**: Same as in mounting.

2. **shouldComponentUpdate(nextProps, nextState)**: Lets you decide if a component's output is affected by changes in props or state. Default behavior is to re-render on every state change.

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```

3. **render()**: Same as in mounting.

4. **getSnapshotBeforeUpdate(prevProps, prevState)**: Called right before the most recently rendered output is committed to the DOM. Enables your component to capture some information from the DOM before it is potentially changed.

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevProps.list.length < this.props.list.length) {
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}
```

5. **componentDidUpdate(prevProps, prevState, snapshot)**: Called immediately after updating occurs. Not called for the initial render.

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
  if (snapshot !== null) {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight - snapshot;
  }
}
```

#### Unmounting

This method is called when a component is being removed from the DOM:

1. **componentWillUnmount()**: Called immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions.

```jsx
componentWillUnmount() {
  clearInterval(this.timerID);
  this.subscription.unsubscribe();
}
```

#### Error Handling

These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component:

1. **static getDerivedStateFromError(error)**: Called when a descendant component throws an error. It receives the error that was thrown and should return a value to update state.

```jsx
static getDerivedStateFromError(error) {
  return { hasError: true };
}
```

2. **componentDidCatch(error, info)**: Called after an error has been thrown by a descendant component. It receives two parameters: the error that was thrown and an object with a componentStack key containing information about which component threw the error.

```jsx
componentDidCatch(error, info) {
  logErrorToMyService(error, info.componentStack);
}
```

### Function Component Lifecycle with Hooks

With the introduction of Hooks, function components can now handle lifecycle events:

#### Mounting and Updating

The `useEffect` Hook combines the functionality of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`:

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    
    // Similar to componentWillUnmount:
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

The second argument to `useEffect` is an array of dependencies. If any of these dependencies change, the effect will run again. If you pass an empty array (`[]`), the effect will only run once after the initial render, similar to `componentDidMount`.

## Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

### Element Variables

You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn't change.

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  let button;
  if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );
}
```

### Inline If with Logical && Operator

You can embed expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator:

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

### Inline If-Else with Conditional Operator

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator `condition ? true : false`:

```jsx
function UserStatus(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

### Preventing Component from Rendering

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return `null` instead of its render output:

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

Understanding the rendering process and component lifecycle is essential for building efficient React applications. By mastering these concepts, you can ensure your components render correctly and perform optimally.
# React JS: Events and Event Handling

Event handling is a crucial part of any interactive web application. React provides a system of handling events that is similar to handling events on DOM elements, but with some syntactic differences and additional features.

## Event Handling in React

In React, event handling follows these key principles:

1. React events are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.
3. You cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly.
4. React events are synthetic events that wrap the native browser events for cross-browser compatibility.

### Basic Event Handling

Here's a simple example of handling a click event in React:

```jsx
function handleClick() {
  alert('Button was clicked!');
}

function MyButton() {
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### Event Handler Parameters

If you need to pass parameters to an event handler, you can use an arrow function:

```jsx
function MyButton() {
  const handleClick = (id, e) => {
    console.log('Button with ID ' + id + ' was clicked');
    console.log(e); // The event object
  };

  return (
    <button onClick={(e) => handleClick('123', e)}>
      Click me
    </button>
  );
}
```

### Event Binding in Class Components

In class components, you need to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind a method and pass it to an event handler, `this` will be `undefined` when the method is called.

There are several ways to ensure `this` is bound correctly:

1. **Bind in Constructor**:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

2. **Class Fields Syntax**:

```jsx
class Toggle extends React.Component {
  state = {isToggleOn: true};
  
  // This syntax ensures `this` is bound within handleClick
  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

3. **Arrow Function in Render**:

```jsx
class Toggle extends React.Component {
  state = {isToggleOn: true};
  
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

Note: Using arrow functions in render creates a new callback each time the component renders, which can cause performance issues in some cases.

### Event Handling in Function Components

In function components, event handling is more straightforward because you don't need to worry about `this`:

```jsx
import React, { useState } from 'react';

function Toggle() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  
  const handleClick = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <button onClick={handleClick}>
      {isToggleOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

## Common React Events

React supports a wide range of events. Here are some of the most commonly used:

### Mouse Events

- `onClick`: Triggered when an element is clicked.
- `onDoubleClick`: Triggered when an element is double-clicked.
- `onMouseEnter`: Triggered when the mouse pointer enters an element.
- `onMouseLeave`: Triggered when the mouse pointer leaves an element.
- `onMouseMove`: Triggered when the mouse pointer moves over an element.

### Form Events

- `onChange`: Triggered when the value of an input element changes.
- `onSubmit`: Triggered when a form is submitted.
- `onFocus`: Triggered when an element receives focus.
- `onBlur`: Triggered when an element loses focus.

### Keyboard Events

- `onKeyDown`: Triggered when a key is pressed down.
- `onKeyPress`: Triggered when a key is pressed and released.
- `onKeyUp`: Triggered when a key is released.

### Touch Events

- `onTouchStart`: Triggered when a touch is started on an element.
- `onTouchMove`: Triggered when a touch is moved on an element.
- `onTouchEnd`: Triggered when a touch is ended on an element.

## The SyntheticEvent Object

React wraps native browser events in a cross-browser wrapper called `SyntheticEvent`. It has the same interface as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.

```jsx
function handleClick(e) {
  e.preventDefault(); // Prevents the default action
  e.stopPropagation(); // Stops the event from bubbling up
  console.log(e.target); // The element that triggered the event
  console.log(e.currentTarget); // The element that the event handler is attached to
  console.log(e.type); // The type of event (e.g., "click")
}
```

## Event Propagation

React's event system simulates event bubbling and capturing phases just like the DOM. Events in React propagate according to the same rules:

1. **Capturing Phase**: Events flow from the root to the target element.
2. **Target Phase**: The event reaches the target element.
3. **Bubbling Phase**: Events bubble up from the target element to the root.

By default, React event handlers are triggered during the bubbling phase. To register an event handler for the capture phase, append `Capture` to the event name:

```jsx
<div onClickCapture={handleClickCapture}>
  <button onClick={handleClick}>Click me</button>
</div>
```

## Best Practices for Event Handling

1. **Keep Handlers Small**: Event handlers should be small and focused. If they grow too large, extract logic into separate functions.

2. **Debounce or Throttle When Necessary**: For events that fire frequently (like `onScroll` or `onResize`), consider using debounce or throttle techniques to limit the rate at which your handlers are called.

```jsx
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a debounced function that only calls the API after the user stops typing
  const debouncedSearch = debounce((term) => {
    // Call API with search term
    console.log('Searching for:', term);
  }, 500);
  
  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
    
    // Cleanup function to cancel debounced calls when component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

3. **Use Event Delegation**: When you have many similar elements that need the same event handler, use event delegation by attaching the handler to a parent element and identifying which child triggered the event.

```jsx
function TodoList({ todos, onToggle }) {
  const handleClick = (e) => {
    if (e.target.tagName === 'LI') {
      const id = e.target.dataset.id;
      onToggle(id);
    }
  };

  return (
    <ul onClick={handleClick}>
      {todos.map(todo => (
        <li key={todo.id} data-id={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

4. **Clean Up Event Listeners**: If you add event listeners directly to the DOM (outside of React's event system), make sure to clean them up to prevent memory leaks.

```jsx
import { useEffect } from 'react';

function WindowSizeTracker() {
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div>Check the console when you resize the window</div>;
}
```

Understanding event handling in React is essential for building interactive applications. By mastering these concepts, you can create responsive and user-friendly interfaces that handle user interactions effectively.
# React JS: Forms and Controlled Components

Forms are an essential part of many web applications. In React, forms work a bit differently from traditional HTML forms because React maintains internal state. This section covers how to work with forms in React, focusing on controlled components, form validation, and best practices.

## Controlled Components

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()` or the state updater function from `useState()`.

A **controlled component** is a form element whose value is controlled by React state. The React component that renders the form also controls what happens in that form on subsequent user input.

### Basic Example of a Controlled Component

```jsx
import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + name);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

In this example:
1. The React state is the "single source of truth" for the input value
2. The `handleChange` function updates the state with each keystroke
3. The `value` attribute on the form element sets the displayed value, making React state the source of truth

### Handling Multiple Inputs

When you need to handle multiple controlled input elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.

```jsx
import React, { useState } from 'react';

function Reservation() {
  const [formData, setFormData] = useState({
    isGoing: true,
    numberOfGuests: 2
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    alert('Is going: ' + formData.isGoing + ', Number of guests: ' + formData.numberOfGuests);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={formData.isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={formData.numberOfGuests}
          onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## Different Form Elements

### Textarea

In HTML, a `<textarea>` element defines its text by its children. In React, a `<textarea>` uses a `value` attribute instead:

```jsx
function EssayForm() {
  const [essay, setEssay] = useState('Please write an essay about your favorite DOM element.');

  const handleChange = (event) => {
    setEssay(event.target.value);
  };

  return (
    <form>
      <label>
        Essay:
        <textarea value={essay} onChange={handleChange} />
      </label>
    </form>
  );
}
```

### Select

In HTML, `<select>` creates a drop-down list. In React, instead of using the `selected` attribute on the `option` tag, a `value` attribute is used on the `select` tag:

```jsx
function FlavorForm() {
  const [flavor, setFlavor] = useState('coconut');

  const handleChange = (event) => {
    setFlavor(event.target.value);
  };

  return (
    <form>
      <label>
        Pick your favorite flavor:
        <select value={flavor} onChange={handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
    </form>
  );
}
```

For multiple selections, you can pass an array as the value:

```jsx
<select multiple={true} value={['B', 'C']}>
```

### File Input

In HTML, `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript.

Because its value is read-only, it is an **uncontrolled component** in React:

```jsx
function FileInput() {
  const fileInput = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected file - ${fileInput.current.files[0].name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form Validation

### Client-Side Validation

React doesn't provide specific form validation functionality, but you can implement your own validation logic:

```jsx
import React, { useState } from 'react';

function ValidationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    // Email validation
    if (!email) {
      formIsValid = false;
      formErrors.email = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      formErrors.email = "Email is not valid";
    }

    // Password validation
    if (!password) {
      formIsValid = false;
      formErrors.password = "Password cannot be empty";
    } else if (password.length < 6) {
      formIsValid = false;
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      // Form submission logic
      console.log("Form is valid, submitting...");
    } else {
      console.log("Form has errors, cannot submit");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using Form Libraries

For complex forms, consider using libraries like Formik, React Hook Form, or Yup:

#### Example with React Hook Form

```jsx
import { useForm } from "react-hook-form";

function HookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("firstName", { required: "First name is required" })} 
        placeholder="First name" 
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      
      <input 
        {...register("email", { 
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address"
          }
        })} 
        placeholder="Email" 
      />
      {errors.email && <p>{errors.email.message}</p>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Uncontrolled Components

In most cases, it's recommended to use controlled components. However, there are situations where uncontrolled components might be simpler, such as when integrating React with non-React code.

In an uncontrolled component, form data is handled by the DOM itself. Instead of writing an event handler for every state update, you can use a ref to get form values from the DOM:

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A name was submitted: ' + inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" defaultValue="Bob" ref={inputRef} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Note the use of `defaultValue` instead of `value`. In an uncontrolled component, you specify the initial value but don't control subsequent updates.

## Best Practices for Forms in React

1. **Use controlled components** when possible for better control over form data and validation.

2. **Implement immediate validation feedback** to improve user experience.

3. **Consider form libraries** for complex forms to reduce boilerplate code.

4. **Use appropriate HTML5 input types** (`email`, `number`, `date`, etc.) to leverage browser validation and appropriate mobile keyboards.

5. **Implement proper error handling** to provide clear feedback to users.

6. **Use fieldsets and legends** for grouping related form controls, improving accessibility.

7. **Add proper ARIA attributes** to enhance accessibility.

8. **Consider form state management** for complex forms (local state for simple forms, context or Redux for complex ones).

9. **Implement proper form submission handling**, including loading states and error handling.

10. **Test your forms thoroughly**, including validation, submission, and error states.

Forms are a critical part of user interaction in web applications. By mastering form handling in React, you can create intuitive, user-friendly interfaces that effectively capture and validate user input.
# React JS: Advanced Concepts - Context API

The Context API is a powerful feature in React that provides a way to share data between components without having to explicitly pass props through every level of the component tree. This is especially useful for data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

## Understanding the Problem Context Solves

In a typical React application, data is passed from parent to child components via props. This approach works well for most cases, but becomes cumbersome when certain types of props need to be accessed by many components at different nesting levels. This is often referred to as "prop drilling."

Consider a scenario where you need to pass a theme preference through many nested components:

```jsx
// Without Context
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div>
      <Header theme={theme} />
      <Main theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

function Main({ theme }) {
  return (
    <main>
      <Section theme={theme} />
    </main>
  );
}

function Section({ theme }) {
  return (
    <section>
      <Article theme={theme} />
    </section>
  );
}

function Article({ theme }) {
  // Finally using the theme
  return (
    <article className={`article-${theme}`}>
      Content
    </article>
  );
}
```

The Context API provides a way to avoid passing props through intermediate elements.

## Creating and Using Context

### Creating a Context

You create a context using `React.createContext()`:

```jsx
// ThemeContext.js
import { createContext } from 'react';

// Create a context with a default value
const ThemeContext = createContext('light');

export default ThemeContext;
```

### Providing Context

To make a context available to child components, you need to use a Context Provider:

```jsx
import { useState } from 'react';
import ThemeContext from './ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Header />
        <Main />
        <Footer />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}
```

### Consuming Context

There are two ways to consume context:

#### 1. Using the useContext Hook (Function Components)

```jsx
import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function Article() {
  const theme = useContext(ThemeContext);
  
  return (
    <article className={`article-${theme}`}>
      Content
    </article>
  );
}
```

#### 2. Using Context.Consumer (Class or Function Components)

```jsx
import ThemeContext from './ThemeContext';

function Article() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <article className={`article-${theme}`}>
          Content
        </article>
      )}
    </ThemeContext.Consumer>
  );
}
```

#### 3. Using contextType (Class Components Only)

```jsx
import React from 'react';
import ThemeContext from './ThemeContext';

class Article extends React.Component {
  static contextType = ThemeContext;
  
  render() {
    const theme = this.context;
    return (
      <article className={`article-${theme}`}>
        Content
      </article>
    );
  }
}
```

## Context with State Management

Context becomes even more powerful when combined with the `useState` or `useReducer` hooks to create a simple state management solution:

```jsx
// ThemeContext.js
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

Then you can use it in your components:

```jsx
import { ThemeProvider, useTheme } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Multiple Contexts

You can use multiple contexts in your application:

```jsx
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { LanguageProvider } from './LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <Main />
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
```

And consume them as needed:

```jsx
import { useTheme } from './ThemeContext';
import { useUser } from './UserContext';
import { useLanguage } from './LanguageContext';

function ProfilePage() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { language, translations } = useLanguage();
  
  return (
    <div className={`profile-${theme}`}>
      <h1>{translations.welcome}, {user.name}!</h1>
      {/* ... */}
    </div>
  );
}
```

## Context Performance Considerations

### Preventing Unnecessary Re-renders

When a context value changes, all components that use that context will re-render, even if they only use a portion of the context value. To optimize performance:

1. **Split contexts by domain**: Create separate contexts for unrelated state that changes at different frequencies.

2. **Memoize context values**: Use `useMemo` to prevent unnecessary re-renders when the context value hasn't actually changed.

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);
  
  // Memoize the context value
  const value = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

3. **Use context selectors**: Create custom hooks that select only the specific parts of context a component needs.

## Best Practices for Context

1. **Don't overuse context**: Context is primarily designed for data that is considered global for a tree of React components. Don't use it for data that should be passed as props.

2. **Create custom hooks**: Wrap context usage in custom hooks to make your code more readable and maintainable.

3. **Provide meaningful default values**: When creating a context, provide a meaningful default value that makes sense even if a component is not wrapped in a provider.

4. **Keep context focused**: Each context should have a single responsibility. Don't put unrelated data in the same context.

5. **Document your contexts**: Make sure to document what each context is for and how it should be used.

6. **Consider alternatives**: For complex state management needs, consider using libraries like Redux, MobX, or Zustand, which are designed for more complex state management scenarios.

The Context API is a powerful tool in React that, when used appropriately, can significantly simplify your component hierarchy and make your code more maintainable by avoiding prop drilling. However, it's important to use it judiciously and be aware of its performance implications.
# React JS: Advanced Concepts - Code Splitting

Code splitting is an advanced technique in React that allows you to split your code into smaller chunks which can be loaded on demand or in parallel. This can significantly improve the performance of your application by reducing the size of the initial bundle that users need to download.

## Why Code Splitting Matters

Modern web applications often include large JavaScript bundles that can slow down the initial load time. Without code splitting, users have to download the entire application code before they can use it, even if they only need a small portion of it initially.

Code splitting helps to:

1. **Reduce initial load time**: Users only download the code they need for the current view
2. **Improve performance**: Smaller bundles lead to faster parsing and execution times
3. **Enable more efficient caching**: Different parts of your application can be cached separately
4. **Optimize resource usage**: Users don't waste bandwidth on code they might never use

## Implementing Code Splitting in React

React provides several ways to implement code splitting:

### 1. Dynamic Import with React.lazy and Suspense

The most common approach is to use the `React.lazy` function along with the `Suspense` component:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Instead of importing components directly
// import Home from './components/Home';
// import About from './components/About';

// Use lazy loading
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

In this example:
- `React.lazy` takes a function that calls `import()` to load a component dynamically
- `Suspense` displays a fallback UI while the lazy component is loading
- The actual component code is only loaded when it's needed (when the user navigates to that route)

### 2. Code Splitting Based on Routes

Route-based code splitting is one of the most effective patterns:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 3. Component-Level Code Splitting

You can also split code at the component level, especially for large components that aren't immediately visible:

```jsx
import React, { Suspense, lazy, useState } from 'react';

const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 4. Named Exports with React.lazy

React.lazy currently only supports default exports. For named exports, you need a small workaround:

```jsx
// Create an intermediate file that re-exports the named export as default
// MediumComponent.js
export { MediumComponent as default } from './components';

// Then in your main file
const MediumComponent = lazy(() => import('./MediumComponent'));
```

## Error Handling with Error Boundaries

When using code splitting, it's important to handle potential loading errors. You can use Error Boundaries to catch errors that occur during component loading:

```jsx
import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <ErrorBoundary fallback={<div>Error loading component</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

Where `ErrorBoundary` is a class component that implements `componentDidCatch`:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

## Advanced Code Splitting Techniques

### 1. Preloading Components

You can preload components before they're actually needed to improve perceived performance:

```jsx
const AboutPage = lazy(() => import('./pages/About'));

function HomePage() {
  const preloadAboutPage = () => {
    // Preload the About page when user hovers over the link
    import('./pages/About');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link 
        to="/about" 
        onMouseOver={preloadAboutPage}
        onFocus={preloadAboutPage}
      >
        About Us
      </Link>
    </div>
  );
}
```

### 2. Prefetching with Webpack Magic Comments

Webpack supports "magic comments" inside dynamic imports to customize the loading behavior:

```jsx
// Prefetch this module in idle time
const AboutPage = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));

// Preload this module (higher priority than prefetch)
const ContactPage = lazy(() => import(/* webpackPreload: true */ './pages/Contact'));

// Give a chunk a name for better debugging
const SettingsPage = lazy(() => import(/* webpackChunkName: "settings" */ './pages/Settings'));
```

### 3. Loading States with Delays

For very fast connections, showing a loading indicator briefly can create a jarring experience. You can add a minimum delay to your loading states:

```jsx
function DelayedSuspense({ children, fallback, delay = 300 }) {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <Suspense fallback={showFallback ? fallback : null}>
      {children}
    </Suspense>
  );
}

// Usage
<DelayedSuspense fallback={<Spinner />} delay={500}>
  <LazyComponent />
</DelayedSuspense>
```

## Best Practices for Code Splitting

1. **Split at the Route Level First**: Start with route-based code splitting as it provides the most obvious and impactful performance benefits.

2. **Identify Large Components**: Use bundle analyzers like `webpack-bundle-analyzer` to identify large components that are good candidates for splitting.

3. **Consider User Flow**: Split components based on user flow - components that aren't needed immediately are good candidates.

4. **Balance Bundle Size**: Don't create too many small chunks as each requires a separate network request. Aim for meaningful chunks.

5. **Use Loading Indicators Wisely**: Provide appropriate loading states but avoid layout shifts when components load.

6. **Test on Real Devices**: Test your code splitting strategy on real devices with various network conditions to ensure a good user experience.

7. **Monitor Performance**: Use tools like Lighthouse and Chrome DevTools to monitor the impact of your code splitting strategy.

8. **Consider Server-Side Rendering**: For initial loads, consider server-side rendering to improve perceived performance.

Code splitting is a powerful technique that, when implemented correctly, can significantly improve the performance of your React applications. By loading code only when it's needed, you can create faster, more efficient applications that provide a better user experience.
# React JS: Advanced Concepts - Error Boundaries

Error Boundaries are a React feature that allows you to catch JavaScript errors anywhere in a component tree, log those errors, and display a fallback UI instead of crashing the entire component tree. They act like a JavaScript `catch {}` block, but for components.

## Why Error Boundaries Matter

In a typical React application, a JavaScript error in one component shouldn't break the entire UI. However, prior to Error Boundaries, a JavaScript error inside a component would corrupt React's internal state and cause it to emit cryptic errors on subsequent renders. Error Boundaries solve this problem by:

1. **Preventing the entire app from crashing** due to errors in a single component
2. **Providing a better user experience** by showing fallback UIs
3. **Enabling error logging** for monitoring and debugging
4. **Isolating errors** to specific parts of the UI

## Creating Error Boundaries

Error Boundaries are class components that implement either `getDerivedStateFromError()`, `componentDidCatch()`, or both:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Understanding the Error Boundary Lifecycle Methods

1. **`static getDerivedStateFromError(error)`**:
   - Called during the "render" phase when an error is thrown
   - Used to render a fallback UI
   - Should not have side effects (like logging)

2. **`componentDidCatch(error, errorInfo)`**:
   - Called during the "commit" phase after an error is thrown
   - Used for side effects like logging errors
   - Receives additional `errorInfo` parameter with component stack trace

## Using Error Boundaries

Error Boundaries can be used at different levels in your component tree:

### 1. Wrapping the Entire Application

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<h1>Application Error</h1>}>
      <MyApp />
    </ErrorBoundary>
  );
}
```

### 2. Wrapping Individual Routes

```jsx
function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <ErrorBoundary fallback={<DashboardError />}>
            <Dashboard />
          </ErrorBoundary>
        </Route>
        <Route path="/profile">
          <ErrorBoundary fallback={<ProfileError />}>
            <Profile />
          </ErrorBoundary>
        </Route>
      </Switch>
    </Router>
  );
}
```

### 3. Wrapping Critical Components

```jsx
function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ErrorBoundary fallback={<p>Chart failed to load</p>}>
        <ComplexChart />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Table failed to load</p>}>
        <DataTable />
      </ErrorBoundary>
    </div>
  );
}
```

## Error Boundary Limitations

Error Boundaries have some important limitations to be aware of:

1. **They don't catch errors in:**
   - Event handlers (use try/catch instead)
   - Asynchronous code (like `setTimeout` or `requestAnimationFrame`)
   - Server-side rendering
   - Errors thrown in the error boundary itself

2. **They only catch errors in the components below them** in the tree, not in the error boundary itself.

3. **They require class components** - there is no Hook equivalent yet (though libraries like `react-error-boundary` provide function component wrappers).

## Error Handling Patterns with Error Boundaries

### 1. Recovering from Errors

You can provide a way for users to recover from errors:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  handleReset() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. Nested Error Boundaries

You can nest error boundaries to create more granular error handling:

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<h1>Critical Application Error</h1>}>
      <Header />
      <ErrorBoundary fallback={<p>Main content failed to load</p>}>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

### 3. Error Boundaries with Keys for Reset

You can force an error boundary to reset by changing its `key` prop:

```jsx
function ProfilePage({ userId }) {
  return (
    <ErrorBoundary 
      key={userId} 
      fallback={<p>Failed to load profile</p>}
    >
      <Profile userId={userId} />
    </ErrorBoundary>
  );
}
```

When `userId` changes, the error boundary will be remounted, clearing any previous error state.

## Using Error Boundaries with Hooks (Function Components)

While Error Boundaries themselves must be class components, you can create custom hooks to work with them:

```jsx
// Using the react-error-boundary library
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ProfilePage({ userId }) {
  const handleError = useErrorHandler();
  
  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      handleError(error);
    }
  };
  
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
      }}
      resetKeys={[userId]}
    >
      <Profile userId={userId} fetchProfile={fetchProfile} />
    </ErrorBoundary>
  );
}
```

## Best Practices for Error Boundaries

1. **Place error boundaries strategically**: Don't wrap every component, but identify critical sections that should be isolated.

2. **Provide meaningful fallback UIs**: Make sure users understand what happened and what they can do next.

3. **Log errors for monitoring**: Always log errors to a monitoring service to track issues in production.

4. **Consider different levels of granularity**: Use nested error boundaries for different parts of your application.

5. **Implement recovery mechanisms**: Give users a way to recover from errors when possible.

6. **Test error scenarios**: Deliberately throw errors in development to ensure your error boundaries work as expected.

7. **Use keys to reset error boundaries**: When navigating between different resources, use keys to reset error state.

8. **Consider using a library**: Libraries like `react-error-boundary` provide additional features and make it easier to work with error boundaries in function components.

Error Boundaries are an essential part of building robust React applications. By implementing them properly, you can ensure that your application gracefully handles unexpected errors and provides a better user experience even when things go wrong.
