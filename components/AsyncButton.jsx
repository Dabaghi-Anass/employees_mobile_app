import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Button from './Button';
const AsyncButton = ({ onPress, text,icon , options }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [iconS, setIcon] = useState(icon);
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);
    const [displayedText, setDisplayedText] = useState(text);
    const executeAfterDelay = (delay, callback) => {
        setTimeout(() => {
            callback();
        }, delay);
    }
    const handlePress = async () => {
        setIsLoading(true);
        setIcon(null);
        try {
            await onPress();
            setIsFinished(true);
            executeAfterDelay(2000, () => {
                setIsFinished(false);
            })
        } catch (error) {
            setError(true);
            executeAfterDelay(2000, () => {
                setError(false);
            });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        let style = {
            size : 30,
            color : "white"
        };
        if (isLoading) {
            setDisplayedText(options?.processPendingMessage ?? "processing");
            setIcon(<MaterialCommunityIcons {...style} name="timer-outline" />)
        }
        else if (isFinished){
            setDisplayedText(options?.processCompleteMessage ?? "done");
            setIcon(<Ionicons {...style} name="checkmark-done" />)

        } else if (error){
            setDisplayedText(options?.processErrorMessage ?? "error occured");
            setIcon(<MaterialIcons {...style} name="error" />)
        } else{
            setDisplayedText(text);
            setIcon(icon);
        }
    }, [isLoading, isFinished, error, text]);

    return (
        <Button
            text={displayedText}
            onPress={handlePress}
            disabled={isLoading}
            icon={iconS}
        />
    );
};

export default AsyncButton;
