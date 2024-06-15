type Props = {
  label: "From" | "To";
  isInputAmountDisabled?: boolean;
  amount: number | "Click convert button to see the result";
  amountChangeHandler?: (value: number) => void;
  currencyTypeOptions: string[];
  selectedCurrencyTypeOption: string;
  currencyTypeChangeHandler: (value: string) => void;
};

const InputBox = ({
  label,
  amount,
  amountChangeHandler,
  isInputAmountDisabled = false,
  currencyTypeOptions,
  selectedCurrencyTypeOption,
  currencyTypeChangeHandler,
}: Props) => {
  return (
    <div className="bg-white rounded-md p-5 flex-col space-y-3">
      <div className="flex items-center justify-between text-gray-400">
        <span>{label}</span>
        <span>Currency Type</span>
      </div>

      <div className="flex items-center justify-between">
        {label === "From" && (
          <input
            disabled={isInputAmountDisabled}
            type="number"
            name={`${label}Amount`}
            id={`${label}Amount`}
            aria-label={`${label}Amount`}
            className="disabled:bg-slate-50 bg-transparent w-full p-3 rounded-xl outline-green-700 border border-green-600"
            value={amount}
            onChange={(e) =>
              amountChangeHandler && amountChangeHandler(Number(e.target.value))
            }
          />
        )}

        {label === "To" && (
          <span
            id={`${label}Amount`}
            className="bg-slate-50 w-full p-3 rounded-xl border border-green-600 cursor-not-allowed"
          >
            {amount}
          </span>
        )}

        <select
          name={`${label}TypeSelector`}
          id={`${label}TypeSelector`}
          aria-label={`${label}TypeSelector`}
          className="w-28 ml-2 sm:ml-4 md:ml-7 xl:ml-8 p-3 rounded-xl cursor-pointer"
          value={selectedCurrencyTypeOption}
          onChange={(e) => currencyTypeChangeHandler(e.target.value)}
        >
          {currencyTypeOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
