import classNames from "classnames";

const Input = ({ value = "", onChange, ...props }) => {
    return (
        <div className="relative min-h-12 rounded-lg border-1 border-[#AEAEAE]">
            <input
                type="text"
                className="w-full px-4 pt-2 placeholder-transparent bg-transparent outline-none peer min-h-12"
                value={value}
                onChange={onChange}
                {...props}
            />
            <label
                className={classNames(
                    "absolute",
                    "left-4",
                    "text-sm",
                    "font-medium",
                    "text-gray-600",
                    "top-1/2",
                    "-translate-y-1/2",
                    "transition-all",
                    "duration-200",
                    "ease-in-out",
                    "peer-focus:top-2.5",
                    "peer-focus:text-xs",
                    "peer-focus:text-gray-500",
                    {
                        "top-2.5 text-xs text-gray-500": value,
                    },
                )}
            >
                Username:
            </label>
        </div>
    );
};

export default Input;
