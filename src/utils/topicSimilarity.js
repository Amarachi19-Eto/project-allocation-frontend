// src/utils/topicSimilarity.js
import natural from 'natural';

// Initialize natural language processing tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Function to preprocess text for comparison
const preprocessText = (text) => {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove punctuation
        .replace(/\s+/g, ' ')     // Normalize whitespace
        .trim();
};

// Function to tokenize and stem text
const tokenizeAndStem = (text) => {
    const tokens = tokenizer.tokenize(preprocessText(text));
    return tokens.map(token => stemmer.stem(token));
};

// Calculate Jaccard similarity between two texts
const calculateSimilarity = (text1, text2) => {
    if (!text1 || !text2) return 0;
    
    const tokens1 = new Set(tokenizeAndStem(text1));
    const tokens2 = new Set(tokenizeAndStem(text2));
    
    if (tokens1.size === 0 || tokens2.size === 0) return 0;
    
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    
    return intersection.size / union.size;
};

// Check if topic is similar to existing topics
export const isSimilarTopic = (newTopicTitle, existingTopics, threshold = 0.7) => {
    if (!newTopicTitle || !existingTopics || existingTopics.length === 0) {
        return false;
    }
    
    for (const topic of existingTopics) {
        const similarity = calculateSimilarity(newTopicTitle, topic.title);
        
        if (similarity >= threshold) {
            return {
                isSimilar: true,
                similarTopic: topic.title,
                similarityScore: similarity
            };
        }
    }
    
    return { isSimilar: false, similarTopic: null, similarityScore: 0 };
};

// Enhanced duplicate check that includes description
export const checkTopicDuplication = (newTopic, existingTopics, titleThreshold = 0.7, descThreshold = 0.6) => {
    const titleCheck = isSimilarTopic(newTopic.title, existingTopics, titleThreshold);
    
    if (titleCheck.isSimilar) {
        return titleCheck;
    }
    
    // Also check if description is too similar to existing topic titles
    if (newTopic.description) {
        const descCheck = isSimilarTopic(newTopic.description, existingTopics, descThreshold);
        if (descCheck.isSimilar) {
            return {
                ...descCheck,
                reason: 'Topic description is similar to existing topic title'
            };
        }
    }
    
    return { isSimilar: false, similarTopic: null, similarityScore: 0 };
};
