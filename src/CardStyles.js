import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { nothing } from './utils';


const CardStyles = ({onUpdate=nothing}) => {
    const colors = ['White', 'Red', 'Yellow', 'Green', 'Blue', 'Black', 'Pink', 'Purple', 'Orange']
    const borderStyles = ['Solid', 'Dotted', 'Ridge', 'Double', 'Groove']
    const fonts = ['Lobster', 'Papyrus', 'Comic Sans']
    const fontColors = ['Black', 'Red', 'Yellow', 'Green', 'Blue', 'White', 'Pink', 'Purple', 'Orange']
    const textAligns = ['Left Justify', 'Center', 'Right Justify']

    const [color, setColor] = useState(colors[0])
    const [borderStyle, setBorderStyle] = useState(borderStyles[0])
    const [borderColor, setBorderColor] = useState(colors[0])
    const [font, setFont] = useState(fonts[0])
    const [fontColor, setFontColor] = useState(fontColors[0])
    const [textAlign, setTextAlign] = useState(textAligns[0])

    const buildStyle = (fieldOverride, option) => {
        const style = {
            card_color: color,
            border: borderStyle,
            border_color: borderColor,
            font: font,
            font_color: fontColor,
            text_align: textAlign,
        }
        if (fieldOverride) {
            style[fieldOverride] = option
        }
        return style
    }

    const update = (setter, field) => option => {
        setter(option)
        onUpdate(buildStyle(field, option))
    }

    return (
        <div className='style-buttons'>
        <DropdownButton id="dropdown-basic-button" title="Card Color">
            {colors.map(option => <Dropdown.Item onClick={update(setColor, 'color')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Border Style">
            {borderStyles.map(option => <Dropdown.Item onClick={update(setBorderStyle, 'border')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Border Color">
            {colors.map(option => <Dropdown.Item onClick={update(setBorderColor, 'border_color')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Font">
            {fonts.map(option => <Dropdown.Item onClick={update(setFont, 'font')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Font Color">
            {colors.map(option => <Dropdown.Item onClick={update(setFontColor, 'font_color')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Text Alignment">
            {textAligns.map(option => <Dropdown.Item onClick={update(setTextAlign, 'text_align')}>{option}</Dropdown.Item>)}
        </DropdownButton>
        </div>
    );
};

export default CardStyles;
