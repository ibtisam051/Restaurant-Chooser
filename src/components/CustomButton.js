import React from "react"
import PropTypes from "prop-types"
import {TouchableOpacity, Text, StyleSheet} from "react-native"

const CustomButton = ({
    title,
    onPress,
    buttonStyle,
    textStyle,
    width,
    disabled,
}) => {
    return (
        <TouchableOpacity
            onPress={disabled ? null : onPress}
            style={[styles.button, buttonStyle, {width: width, backgroundColor: disabled ? "#ccc" : "#007AFF"},]}
>
            <Text style={[styles.text, textStyle]}>{title}</Text>
</TouchableOpacity>
    );
};

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    width: PropTypes.string,
    disabled: PropTypes.bool,
};  

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 8,
        alignItems: "center"},
    text: {
        color: "#fff",
        fontWeight: "bold"
    },
});

export default CustomButton;