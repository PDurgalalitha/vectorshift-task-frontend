{
  /* 
    Common component for customized buttons.
    Uses Flexbox for centering and arbitrary Tailwind shadows for depth.

    Props:
    - handleClick: (Function) Callback function triggered on button click.
    - text: (String) Label/Title text displayed inside the button.
  */
}
export const Button = ({ handleClick, text }) => {
  return (
    <div className="flex align-center justify-center">
      <button
        type="submit"
        onClick={() => handleClick()}
        className={`p-2 text-lg bg-blue-700 text-[#fff] rounded-3xl w-[100px] shadow-[5px_5px_20px_#aaaaaa]`}
      >
        {text}
      </button>
    </div>
  );
};
