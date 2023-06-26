import React from 'react';

const ColorfulText = ({ text }) => {
    const detectTextType = (text) => {
        const urlRegex = /(https?:\/\/\S+)/gi;
        const emailRegex = /(\S+@\S+\.\S+)/gi;
        const hashtagRegex = /#(\w+)/gi;

        const coloredText = text.split(/( |^)/).map((word) => {
            if (word.match(urlRegex)) {
                return <span style={{ color: 'blue' }}>{word}</span>;
            } else if (word.match(emailRegex)) {
                return <span style={{ color: 'green' }}>{word}</span>;
            } else if (word.match(hashtagRegex)) {
                return <span style={{ color: 'purple' }}>{word}</span>;
            }
            return word;
        });

        return coloredText;
    };

    const coloredText = detectTextType(text);

    return <p>{coloredText}</p>;
};

export default ColorfulText;
