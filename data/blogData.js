import { v4 as uuidv4 } from 'uuid';

export const blogData = [
  {
    id: uuidv4(),
    title: 'Understanding Neural Networks',
    url: 'understanding-neural-networks',
    category: 'Machine Learning',
    img: '/images/blog-neural-networks.jpg',
    publishDate: 'March 20, 2025',
    tags: ['AI', 'Deep Learning', 'Neural Networks'],
    content: `### Introduction

Neural networks are a fundamental part of modern AI systems...`,
  },
  {
    id: uuidv4(),
    title: 'Top 5 Data Science Tools in 2025',
    url: 'top-5-data-science-tools',
    category: 'Data Science',
    img: '/images/blog-data-tools.png',
    publishDate: 'April 5, 2025',
    tags: ['Data Science', 'Tools', 'Python'],
    content: `### The Best Tools for Data Science

Let's explore the most efficient tools used by data scientists today...`,
  },
];