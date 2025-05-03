export const Button = ({
    style,
    ...rest
} : any) => (<button
    style={{
      padding: '4px 8px', backgroundColor: 'teal', color: 'white', fontSize: '20px', border: 'none', borderRadius: '8px', cursor: 'pointer', ...style, }}
    {...rest}
  />);
