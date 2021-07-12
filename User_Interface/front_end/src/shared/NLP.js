export const NLP = 
[
    {
        id: 0,
        question: "What do you understand by Natural Language Processing?",
        answer1: "Natural language processing is a branch of artificial intelligence that helps computers understand, interpret and manipulate human language. NLP draws from many disciplines, including computer science and computational linguistics, in its pursuit to fill the gap between human communication and computer understanding.",
        answer2: "Natural language processing  is the relationship between computers and human language. More specifically, natural language processing is the computer understanding, analysis, manipulation, and/or generation of natural language.",
        answer3: "Natural Language Processing or NLP is an automated way to understand or analyze the natural languages and extract required information from such data by applying machine learning Algorithms"
    },
    {
        id: 1,
        question: "What are stop words?",
        answer1: "Stop words are said to be useless data for a search engine. There are stop words such as was, were, is, am, the, a, an, how, why, and many more. In Natural Language Processing, we eliminate the stop words to understand and analyze the meaning of a sentence.",
        answer2: "stop words are words which are filtered out before or after processing of natural language data. The reason why stop words are critical to many applications is that, if we remove the words that are very commonly used in a given language, we can focus on the important words instead.",
        answer3: "A stop word is a commonly used word (such as “the”, “a”, “an”, “in”) that a search engine has been programmed to ignore, both when indexing entries for searching and when retrieving them as the result of a search query."
    },
    {
        id: 2,
        question: "What is TF-IDF?",
        answer1: "TF-IDF or Term Frequency-Inverse Document Frequency indicates the importance of a word in a set. It helps in information retrieval with numerical statistics. For a specific document, TF-IDF shows a frequency that helps identify the keywords in a document.",
        answer2: "TF-IDF is a statistical measure that evaluates how relevant a word is to a document in a collection of documents. This is done by multiplying two metrics: how many times a word appears in a document, and the inverse document frequency of the word across a set of documents.",
        answer3: "TF-IDF helps to establish how important a particular word is in the context of the document corpus. TF-IDF takes into account the number of times the word appears in the document and offset by the number of documents that appear in the corpus."
    },
    {
        id: 3,
        question: "What is Syntactic Analysis?",
        answer1: "Syntactic analysis is a technique of analyzing sentences to extract meaning from it. Using syntactic analysis, a machine can analyze and understand the order of words arranged in a sentence. NLP employs grammar rules of a language that helps in the syntactic analysis of the combination and order of words in documents.",
        answer2: "Syntactic analysis is defined as analysis that tells us the logical meaning of certain given sentences or parts of those sentences. We also need to consider rules of grammar in order to define the logical meaning as well as correctness of the sentences.",
        answer3: "Syntactic Analysis is the process of analyzing natural language with the rules of a formal grammar. Grammatical rules are applied to categories and groups of words, not individual words. Syntactic analysis basically assigns a semantic structure to text."
    },
    {
        id: 4,
        question: "What is Semantic Analysis?",
        answer1: "Semantic analysis helps make a machine understand the meaning of a text. It uses various algorithms for the interpretation of words in sentences. It also helps understand the structure of a sentence.",
        answer2: "semantic analysis is the process of drawing meaning from text. It allows computers to understand and interpret sentences, paragraphs, or whole documents, by analyzing their grammatical structure, and identifying relationships between individual words in a particular context.",
        answer3: "Semantic analysis describes the process of understanding natural language. the way that humans communicate based on meaning and context. It starts by reading all of the words in content to capture the real meaning of any text. It identifies the text elements and assigns them to their logical and grammatical role. "
    },
    {
        id: 5,
        question: "Explain how we can do parsing",
        answer1: "Parsing is the method to identify and understand the syntactic structure of a text. It is done by analyzing the individual elements of the text. The machine parses the text one word at a time, then two at a time, further three, and so on.",
        answer2: "parsing means analysis of an input to organize the data according to the rule of a grammar",
        answer3: "parsing in NLP is the process of determining the syntactic structure of a text by analyzing its constituent words based on an underlying grammar (of the language)"
    },
    {
        id: 6,
        question: "Explain Stemming with the help of an example.",
        answer1: "stemming is the method to extract the root word by removing suffixes and prefixes from a word.For example, we can reduce ‘stemming’ to ‘stem’ by removing ‘m’ and ‘ing.’",
        answer2: "Stemming is the process of producing morphological variants of a root/base word. A stemming algorithm reduces the words “chocolates”, “chocolatey”, “choco” to the root word, “chocolate” and “retrieval”, “retrieved”, “retrieves” reduce to the stem “retrieve”",
        answer3: "Stemming is one of the most common data pre-processing operations we do in almost all Natural Language Processing. It is the process of removing a part of a word, or reducing a word to its stem or root.  For example, the stem of the words eating, eats, eaten is eat."
    },
    {
        id: 7,
        question: "Explain Lemmatization with the help of an example",
        answer1: "We use stemming and lemmatization to extract root words. However, stemming may not give the actual word, whereas lemmatization generates a meaningful word. In lemmatization, rather than just removing the suffix and the prefix, the process tries to find out the root word with its proper meaning. for example, Bricks’ becomes ‘brick,’ ‘corpora’ becomes ‘corpus’.",
        answer2: "Lemmatization is the process of converting a word to its base form. The difference between stemming and lemmatization is, lemmatization considers the context and converts the word to its meaningful base form, whereas stemming just removes the last few characters, often leading to incorrect meanings and spelling errors. for example, ‘Caring’ -> Lemmatization -> ‘Care’.",
        answer3: "Lemmatization is closely related to stemming. In linguistics, it is the process of grouping together the different inflected forms of a word so they can be analyzed as a single item. Putting an example to the definition, “computers” is an inflected form of “computer”, the same logic as “dogs” being an inflected form of “dog”"
    },
    {
        id: 8,
        question: "What is Parts-of-speech Tagging?",
        answer1: "The parts-of-speech (POS) tagging is used to assign tags to words such as nouns, adjectives, verbs, and more. The software uses the POS tagging to first read the text and then differentiate the words by tagging. It helps in making the machine understand the meaning of a sentence.",
        answer2: "it may be defined as the process of assigning one of the parts of speech to the given word. It is generally called POS tagging. In simple words, we can say that POS tagging is a task of labelling each word in a sentence with its appropriate part of speech. We know that parts of speech include nouns, verb, adverbs, adjectives, pronouns, conjunction and their sub-categories.",
        answer3: "A Part-Of-Speech Tagger (POS Tagger) is a piece of software that reads text in some language and assigns parts of speech to each word (and other token), such as noun, verb, adjective, etc."
    },
    {
        id: 9,
        question: "Explain Named Entity Recognition",
        answer1: "Named Entity Recognition (NER) is an information retrieval process. NER helps classify named entities such as monetary figures, location, things, people, time, and more. It allows the software to analyze and understand the meaning of the text.",
        answer2: "It is the task of identifying and categorizing key information (entities) in text. An entity can be any word or series of words that consistently refers to the same thing. Every detected entity is classified into a predetermined category",
        answer3: "It is an AI technique that automatically identifies named entities in a text and classifies them into predefined categories. Entities can be names of people, organizations, locations, times, quantities, monetary values, percentages, and more"
    },
    {
        id: 10,
        question: "What are Regular Expressions?",
        answer1: "A regular expression is used to match and tag words. It consists of a series of characters for matching strings.",
        answer2: "Regular expressions are specially encoded text strings used as patterns for matching sets of strings.",
        answer3: "They are patterns used to match character combinations in strings."
    },
    {
        id: 11,
        question: "Why is NLP so hard?",
        answer1: "There are several factors that make the process of Natural Language Processing difficult. There are hundreds of natural languages all over the world, words can be ambiguous in their meaning, each natural language has a different script and syntax, the meaning of words can change depending on the context, and so the process of NLP can be difficult.",
        answer2: "NLP is a big field and covers things from very ML-like (classifiers with bag of words features) to not at all ML-like (machine translation). You need to spend some time on a survey of NLP problems, then zero in on the ones you care about, which may or may not involve the methods you're familiar with.",
        answer3: "NLP is so hard because of many reasons. For example, Knowledge of the world is still difficult for computers to acquire, It is hard to understand whether two sentences or two concepts are equal, and Optimizing the wrong metrics"
    },
    {
        id: 12,
        question: "What is information extraction?",
        answer1: "Information extraction in the context of Natural Language Processing refers to the technique of extracting structured information automatically from unstructured sources to ascribe meaning to it. This can include extracting information regarding attributes of entities, relationship between different entities and more",
        answer2: "Information extraction (IE) is the automated retrieval of specific information related to a selected topic from a body or bodies of text.",
        answer3: "Information Extraction systems takes natural language text as input and produces structured information specified by certain criteria, that is relevant to a particular application."
    },
    {
        id: 13,
        question: "Difference between BatchNorm and LayerNorm?",
        answer1: "BatchNorm Computes the mean and var at each layer for every minibatch. LayerNorm Computes the mean and var for every single sample for each layer independently",
        answer2: "Batch normalization is applied on the neuron activation for all the samples in the mini-batch such that the mean of output lies close to 0 and the standard deviation lies close to 1. It also introduces two learning parameters gama and beta in its calculation which are all optimized during training. Layer Normalization is not dependent on batches and the normalization is applied on the neuron for a single instance across all features",
        answer3: "All the normalization is calculated using this equation x^=x minus mean of x¯ over std of x¯ . The difference is how to calculate the  x¯ . In layer normalization  x¯  = all of the summed inputs to the neurons in a layer on a single training case And in batch normalization  x¯ = all of the summed inputs of single neuron on single batch"
    },
    {
        id: 14,
        question: "What is the information in hidden and cell state of LSTM?",
        answer1: "Hidden stores all the information till that time step and cell state stores particular information that might be needed in the future time step.",
        answer2: "Cell state is a memory of LSTM cell, hidden state is an output of this cell. Hidden state and cell input are used to control what to do with memory: to forget or to write new information. We decide what to do with memory knowing about previous output (hidden state) and current input.",
        answer3: "hidden state is Working memory capability that carries information from immediately previous events and overwrites at every step uncontrollably -present at RNNs and LSTMs cell state is long term memory capability that stores and loads information of not necessarily immediately previous events present in LSTMs"
    },
    {
        id: 15,
        question: "What is the difference between hard and soft parameter sharing in multi task learning?",
        answer1: "In hard sharing, we train for all the task at once and update weight based on all the losses. In soft, we train for only one task at a time",
        answer2: "Instead of sharing exactly the same value of the parameters, in soft parameter sharing, we add a constraint to encourage similarities among related parameters. More specifically, we learn a model for each task and penalize the distance between the different models' parameters. Unlike hard sharing, this approach gives more flexibility for the tasks by only loosely coupling the shared space representations.",
        answer3: "Hard sharing is generally applied by sharing the hidden layers between all tasks, while keeping several task-specific output layers. In soft parameter sharing on the other hand, each task has its own model with its own parameters. The distance between the parameters of the model is then regularized in order to encourage the parameters to be similar. "
    },
    {
        id: 16,
        question: "Why transformer perform better than LSTM?",
        answer1: "Transformer models are essentially attention based models. They see the entire sentence as a whole unlike LSTMs (or in general RNNs) where the sentence is processed sequentially - one word per time step. During training LSTMs need to propagate the error back in time through words one word at a time. Transformer sees all words simultaneously - so there is no backpropagation through time.",
        answer2: "Transformers are better than all the other architectures because they totally avoid recursion, by processing sentences as a whole and by learning relationships between words thank's to multi-head attention mechanisms and positional embeddings.",
        answer3: "For machine translation tasks, seq2seq models, consisting of encoder and decoder were used. This involved usage of Recurrent Neural Networks, both for constructing the encoder and the decoder. The architecture used to memorize the entire sentence from the source language and regurgitate it into the target language. This process works fine for shorter sentences, but as the length of the sentence increases the performance slumps. It is, therefore, difficult for a recurrent neural network to memorize a rather long sentence. The attention mechanism helps us overcome this difficulty"
    },
    {
        id: 17,
        question: "What is text mining?",
        answer1: "Text mining, also referred to as text data mining, roughly equivalent to text analytics, is the process of deriving high-quality information from text. High-quality information is typically derived through the devising of patterns and trends through means such as statistical pattern learning.",
        answer2: "Text mining (also referred to as text analytics) is an artificial intelligence (AI) technology that uses natural language processing (NLP) to transform the free (unstructured) text in documents and databases into normalized, structured data suitable for analysis or to drive machine learning (ML) algorithms.",
        answer3: "Text mining is the process of transforming unstructured text into a structured format to identify meaningful patterns and new insights. By applying advanced analytical techniques, such as Naïve Bayes, Support Vector Machines (SVM), and other deep learning algorithms, companies are able to explore and discover hidden relationships within their unstructured data."
    },
    {
        id: 18,
        question: "What is Topic Modeling ? When we will do it ?",
        answer1: "Topic modeling is an unsupervised machine learning technique that’s capable of scanning a set of documents, detecting word and phrase patterns within them, and automatically clustering word groups and similar expressions that best characterize a set of documents.",
        answer2: "Topic modeling is a type of statistical modeling for discovering the abstract “topics” that occur in a collection of documents. Latent Dirichlet Allocation (LDA) is an example of topic model and is used to classify text in a document to a particular topic",
        answer3: "Topic modeling is part of a class of text analysis methods that analyze “bags” or groups of words together—instead of counting them individually–in order to capture how the meaning of words is dependent upon the broader context in which they are used in natural language. Topic modeling is not the only method that does this– cluster analysis, latent semantic analysis, and other techniques have also been used to identify clustering within texts"
    },
    {
        id: 19,
        question: "Why self-attention is awesome?",
        answer1: "In terms of computational complexity, self-attention layers are faster than recurrent layers when the sequence length n is smaller than the representation dimensionality d, which is most often the case with sentence representations used by state-of-the-art models in machine translations, such as word-piece and byte-pair representations.",
        answer2: "self-attention Minimizes total computational complexity per layer. Maximizes amount of parallelizable computations, measured by minimum number of sequential operations required. Minimizes maximum path length between any two input and output positions in network composed of the different layer types . The shorter the path between any combination of positions in the input and output sequences, the easier to learn long-range dependencies.",
        answer3: "self-attention Minimizes total computational complexity per layer. Maximizes amount of parallelizable computations, measured by minimum number of sequential operations required. Minimizes maximum path length between any two input and output positions in network composed of the different layer types . The shorter the path between any combination of positions in the input and output sequences, the easier to learn long-range dependencies."
    }
]