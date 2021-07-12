export const DL = 
[
    {
        id: 0,
        question: "What is deep learning?",
        answer1: "Deep learning is a part of machine learning with an algorithm inspired by the structure and function of the brain, which is called an artificial neural network.Deep learning is suited over a range of fields such as computer vision, speech recognition, natural language processing, etc.",
        answer2: "Deep learning is a subset of machine learning in artificial intelligence that has networks capable of learning unsupervised from data that is unstructured or unlabeled. Also known as deep neural learning or deep neural network.",
        answer3: "Deep learning is an artificial intelligence (AI) function that imitates the workings of the human brain in processing data and creating patterns for use in decision making."
    },
    {
        id: 1,
        question: "What are the main differences between AI, Machine Learning, and Deep Learning?",
        answer1: "AI stands for Artificial Intelligence. It is a technique which enables machines to mimic human behavior.Machine Learning is a subset of AI which uses statistical methods to enable machines to improve with experiences.Deep learning is a part of Machine learning, which makes the computation of multi-layer neural networks feasible. It takes advantage of neural networks to simulate human-like decision making. anyone to heaven, I wish I could get my mother-in-law to eat it!",
        answer2: "Artificial intelligence is any computer program that does something smart. It can be a stack of a complex statistical model or if-then statements.Machine learning is a subset of AI. The theory is simple, machines take data and ‘learn’ for themselvesDeep learning is a subset of machine learning. Deep artificial neural networks are a set of algorithms reaching new levels of accuracy for many important problems",
        answer3: "Artificial intelligence is a science like mathematics or biology. It studies ways to build intelligent programs and machines that can creatively solve problems, which has always been considered a human prerogative.Machine learning is a subset of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. In ML, there are different algorithms (e.g. neural networks) that help to solve problems.Deep learning, is a subset of machine learning, which uses the neural networks to analyze different factors with a structure that is similar to the human neural system."
    },
    {
        id: 2,
        question: "Differentiate supervised and unsupervised deep learning procedures",
        answer1: "Supervised learning is a system in which both input and desired output data are provided. Input and output data are labeled to provide a learning basis for future data processing.Unsupervised procedure does not need labeling information explicitly, and the operations can be carried out without the same. The common unsupervised learning method is cluster analysis. It is used for exploratory data analysis to find hidden patterns or grouping in data.",
        answer2: "In Supervised learning, you train the machine using data which is well labeled.Unsupervised learning is a machine learning technique, where you do not need to supervise the model. Instead, you need to allow the model to work on its own to discover information. It mainly deals with the unlabelled data. ",
        answer3: "supervised learning is where I have the input data and the corresponding output.Unsupervised learning is where only the input data  is present and no corresponding output variable is there."
    },
    {
        id: 3,
        question: "What is the cost function?",
        answer1: "A cost function describes us how well the neural network is performing with respect to its given training sample and the expected output. It may depend on variables such as weights and biases.It provides the performance of a neural network as a whole. In deep learning, our priority is to minimize the cost function. That's why we prefer to use the concept of gradient descent.",
        answer2: "It is a function that measures the performance of a Machine Learning model for given data. Cost Function quantifies the error between predicted values and expected values and presents it in the form of a single real number.",
        answer3: "cost functions are used to estimate how badly models are performing. Put simply, a cost function is a measure of how wrong the model is in terms of its ability to estimate the relationship between X and y."
    },
    {
        id: 4,
        question: "Do you think that deep network is better than a shallow one?",
        answer1: "Both shallow and deep networks are good enough and capable of approximating any function. But for the same level of accuracy, deeper networks can be much more efficient in terms of computation and number of parameters. Deeper networks can create deep representations. At every layer, the network learns a new, more abstract representation of the input.",
        answer2: "A shallow network has less number of hidden layers. While there are studies that a shallow network can fit any function, it will need to be really fat. That causes the number of parameters to increase a lot.There are quite conclusive results that a deep network can fit functions better with less parameters than a shallow network.",
        answer3: "Shallow means that number of hidden layer = 1 . And in case of deep network we have more than equal to 2 hidden layers . The idea of having more layers is to extract more finer features of the input vector . So generally as we increase the depth of the model we increase the power of the model at the cost of the computational complexity ."
    },
    {
        id: 5,
        question: "What do you mean by overfitting?",
        answer1: "Overfitting is the most common issue which occurs in deep learning. It usually occurs when a deep learning algorithm apprehends the sound of specific data. It also appears when the particular algorithm is well suitable for the data and shows up when the algorithm or model represents high variance and low bias.",
        answer2: "Overfitting refers to a model that models the training data too well. Overfitting happens when a model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on new data.",
        answer3: "Overfitting is a term used in statistics that refers to a modeling error that occurs when a function corresponds too closely to a particular set of data. As a result, overfitting may fail to fit additional data, and this may affect the accuracy of predicting future observations."
    },
    {
        id: 6,
        question: "What are the disadvantages of deep learning?",
        answer1: "Deep learning model takes longer time to execute the model. In some cases, it even takes several days to execute a single model depends on complexity. The deep learning model is not good for small data sets, and it fails here.",
        answer2: "It requires very large amount of data in order to perform better than other techniques. It is extremely expensive to train due to complex data models. Moreover deep learning requires expensive GPUs and hundreds of machines. This increases cost to the users. ",
        answer3: "Requires a large amount of data. Is extremely computationally expensive to train. The most complex models take weeks to train using hundreds of machines equipped with expensive GPUs."
    },
    {
        id: 7,
        question: "Explain Data Normalization.",
        answer1: "Data normalization is an essential preprocessing step, which is used to rescale values to fit in a specific range. It assures better convergence during backpropagation.",
        answer2: "the goal of normalization is to change the values of numeric columns in the dataset to a common scale, without distorting differences in the ranges of values.",
        answer3: "Normalization is an approach which is applied during the preparation of data in order to change the values of numeric columns in a dataset to use a common scale when the features in the data have different ranges."
    },
    {
        id: 8,
        question: "Why is zero initialization not a good weight initialization process?",
        answer1: "If the set of weights in the network is put to a zero, then all the neurons at each layer will start producing the same output and the same gradients during backpropagation.",
        answer2: "Initializing all the weights with zeros leads the neurons to learn the same features during training.",
        answer3: "In this case, the equations of the learning algorithm would fail to make any changes to the network weights, and the model will be stuck.",
    },
    {
        id: 9,
        question: "what do you know about input layer?",
        answer1: "The input layer contains input neurons which send information to the hidden layer.",
        answer2: "The input layer passes the data directly to the first hidden layer where the data is multiplied by the first hidden layer's weights.",
        answer3: "Input Layer: Input variables, sometimes called the visible layer. "
    },
    {
        id: 10,
        question: "What is the use of the Activation function?",
        answer1: "The basic purpose of the activation function is to introduce non-linearity into the output of a neuron.",
        answer2: "Without the Activation function, the neural network would be only able to learn function, which is a linear combination of its input data.",
        answer3: "with the activation function, the Neural Network can successfully approximate functions that do not follow linearity or it can successfully predict the class of a function that is divided by a decision boundary that is not linear."
    },
    {
        id: 11,
        question: "What do you mean by Dropout?",
        answer1: "Dropout is a cheap regulation technique used for reducing overfitting in neural networks. We randomly drop out a set of nodes at each training step. As a result, we create a different model for each training case, and all of these models share weights. It's a form of model averaging.",
        answer2: "Dropout is a technique where randomly selected neurons are ignored during training. This means that their contribution to the activation of downstream neurons is temporally removed on the forward pass and any weight updates are not applied to the neuron on the backward pass.",
        answer3: "With Dropout, the training process essentially drops out neurons in a neural network. They are temporarily removed from the network,"
    },
    {
        id: 12,
        question: "Explain the gradient descent algorithm?",
        answer1: "An optimization algorithm that is used to minimize some function by repeatedly moving in the direction of steepest descent as specified by the negative of the gradient is known as gradient descent. It's an iteration algorithm, in every iteration algorithm, we compute the gradient of a cost function, concerning each parameter and update the parameter of the function",
        answer2: "Gradient descent is an optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient. In machine learning, we use gradient descent to update the parameters of our model.",
        answer3: "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function. To find a local minimum of a function using gradient descent, we take steps proportional to the negative of the gradient (or approximate gradient) of the function at the current point."
    },
    {
        id: 13,
        question: "Explain the following variant of Gradient Descent Stochastic?",
        answer1: "Stochastic gradient descent is used to calculate the gradient and update the parameters by using only a single training example.",
        answer2: "Instead of going through all examples, Stochastic Gradient Descent (SGD) performs the parameters update on each example",
        answer3: "the term stochastic comes from the fact that the gradient based on a single training sample is a stochastic approximation of the true cost gradient."
    },
    {
        id: 14,
        question: "Explain the following variant of Gradient Descent mini-batch?",
        answer1: "Mini-batch gradient descent is a variation of stochastic gradient descent. Instead of a single training example, mini-batch of samples is used. Mini-batch gradient descent is one of the most popular optimization algorithms.",
        answer2: "Instead of going over all examples, Mini-batch Gradient Descent sums up over lower number of examples based on the batch size.",
        answer3: "This is a type of gradient descent which works faster than both batch gradient descent and stochastic gradient descent. Here b examples where b<m are processed per iteration."
    },
    {
        id: 15,
        question: "What do you understand by a convolutional neural network?",
        answer1: "A convolutional neural network is a feedforward neural network. It uses convolution in at least one of its layers. The convolutional layer contains a set of filter (kernels). This filter is sliding across the entire input image, computing the dot product between the weights of the filter and the input image. As a result of training, the network automatically learns filters that can detect specific features.",
        answer2: "A convolutional neural network (CNN) is a type of artificial neural network used in image recognition and processing that is specifically designed to process pixel data.",
        answer3: "A convolutional neural network, or CNN, is a deep learning neural network designed for processing structured arrays of data such as images."
    },
    {
        id: 16,
        question: "Explain the layer of CNN: convolution",
        answer1: "This layer comprises of a set of independent filters. All these filters are initialized randomly. These filters then become our parameters which will be learned by the network subsequently.",
        author: "The main task of the convolutional layer is to detect local conjunctions of features from the previous layer and mapping their appearance to a feature map.",
        date: "A convolution is the simple application of a filter to an input that results in an activation."
    },
    {
        id: 17,
        question: "Explain the layer of CNN: pooling",
        answer1: "It reduces the spatial size of the representation to lower the number of parameters and computation in the network. This layer operates on each feature map independently.",
        answer2: "pooling or downsampling layer is responsible for reducing the spacial size of the activation maps.",
        answer3: "while pooling , the number of nodes are reduced.And for flatten as it is converted to a single dimension array."
    },
    {
        id: 18,
        question: "What is an RNN?",
        answer1: "RNN stands for Recurrent Neural Networks. These are the artificial neural networks which are designed to recognize patterns in sequences of data such as handwriting, text, the spoken word, genomes, and numerical time series data.",
        answer2: "A recurrent neural network (RNN) is a class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior.",
        answer3: "RNNs are designed to recognize the sequential characteristics in data and use patterns to predict the next likely scenario"
    },
    {
        id: 19,
        question: "Explain the importance of LSTM.",
        answer1: "It is an artificial RNN (Recurrent Neural Network) architecture, which is used in the field of deep learning. LSTM has feedback connections which makes it a general purpose computer. It can process not only a single data point but also entire sequences of data.",
        answer2: "LSTM networks are well-suited to classifying, processing and making predictions based on time series data, since there can be lags of unknown duration between important events in a time series.",
        answer3: "LSTMs have property of selectively remembering patterns for long durations of time."
    },
]