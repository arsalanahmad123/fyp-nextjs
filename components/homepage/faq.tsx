'use client';

import type React from 'react';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';

type AccordionItem = {
    question: string;
    answer: string | React.ReactNode;
};

const faqData: AccordionItem[] = [
    {
        question: 'What is an AI writer website?',
        answer: 'An AI writer website is a platform that uses artificial intelligence to generate written content. It can create articles, blog posts, marketing copy, and more, often with minimal human intervention. An AI writer website is a platform that uses artificial intelligence to generate written content. It can create articles, blog posts, marketing copy, and more, often with minimal human intervention.',
    },
    {
        question: 'How does AI writing work?',
        answer: 'AI writing works by using machine learning models trained on vast amounts of text data. These models learn patterns, grammar, and style from existing content, then generate new text based on prompts or instructions. Advanced AI writers use technologies like GPT (Generative Pre-trained Transformer) to understand context and produce human-like writing.',
    },
    {
        question: 'What can I use AI writing for?',
        answer: "AI writing can be used for creating blog posts, social media content, marketing copy, product descriptions, emails, reports, summaries, creative writing, and more. It's particularly helpful for generating first drafts, overcoming writer's block, or scaling content production.",
    },
    {
        question: 'Is the content generated by AI original?',
        answer: "AI-generated content is technically unique in its specific arrangement of words, but it's based on patterns learned from existing content. While not plagiarized, it may not be entirely novel in ideas or insights. Most AI writing tools aim to produce content that passes originality checks, but human review and editing are recommended to ensure true originality and accuracy.",
    },
    {
        question: 'How do I use an AI writer website?',
        answer: 'To use an AI writer website, you typically create an account, select the type of content you want to generate, provide some input parameters (like topic, tone, length), and then the AI generates content based on your specifications. You can then edit and refine the output as needed. Most platforms offer different templates or specialized tools for various content types.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(index === openIndex ? -1 : index);
    };

    return (
        <section className="w-full pt-20 md:pt-24 pb-40 lg:pb-56 bg-gradient-to-r from-[#DBF1C3] to-[#DCE7E3] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="space-y-2">
                        <p className="text-[16px] font-medium uppercase tracking-wider text-theme mb-2">
                            FAQ
                        </p>
                        <h2 className="text-3xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                            Frequently asked
                            <br />
                            question
                        </h2>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="border-b border-gray-400">
                            <Button
                                variant={'outline'}
                                onClick={() => toggleAccordion(index)}
                                className="flex justify-between items-center w-full py-4 text-left font-semibold md:text-2xl text-sm bg-transparent hover:bg-transparent cursor-pointer shadow-none border-none"
                                aria-expanded={openIndex === index}
                                aria-controls={`accordion-content-${index}`}
                            >
                                <span>{item.question}</span>
                                <span className="ml-6 flex-shrink-0">
                                    {openIndex === index ? (
                                        <Minus className="h-5 w-5" />
                                    ) : (
                                        <Plus className="h-5 w-5" />
                                    )}
                                </span>
                            </Button>
                            <div
                                id={`accordion-content-${index}`}
                                className={`overflow-hidden transition-all duration-500 ease-in-out max-w-full  text-sm md:text-[18px] my-2 ${
                                    openIndex === index
                                        ? 'max-h-96 opacity-100 pb-6'
                                        : 'max-h-0 opacity-0'
                                }`}
                                aria-hidden={openIndex !== index}
                            >
                                <div className="text-gray-600 px-5">
                                    {typeof item.answer === 'string' ? (
                                        <p>{item.answer}</p>
                                    ) : (
                                        item.answer
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
