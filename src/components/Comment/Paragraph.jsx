export const Paragraph = ({ content, className }) => {
    const baseStyle = 'text-paragraph font-normal w-full my-4';
    const additionalStyle = 'text-[rgb(115,119,122)]';
    return <p className={`${baseStyle} ${!!className ? className : additionalStyle}`}>{content}</p>
}
