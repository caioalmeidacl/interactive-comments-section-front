export const Paragraph = ({ content, className }) => {
    const baseStyle = 'text-paragraph font-normal text-[rgb(115,119,122)]';
    const additionalStyle = className ? className : '';
    return <p className={`${baseStyle} ${additionalStyle}`}>{content}</p>
}
