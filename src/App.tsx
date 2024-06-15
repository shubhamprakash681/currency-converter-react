import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import Navbar from "./components/Navbar";
import useAxiosGet from "./hooks/useAxiosGet";
import { IoSwapVertical } from "react-icons/io5";

const utcToLocale = (date: Date | string): string => {
  const localeDate = new Date(date);
  return localeDate.toString();
};

const App = () => {
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<
    number | "Click convert button to see the result"
  >("Click convert button to see the result");
  const [selectedFromCurrencyType, setSelectedFromCurrencyType] =
    useState<string>("USD");
  const [selectedToCurrencyType, setSelectedToCurrencyType] =
    useState<string>("INR");
  const [currencyTypeOptions, setCurrencyTypeOpions] = useState<string[]>([]);

  const handleFromCurrTypeChange = (value: string) => {
    setSelectedFromCurrencyType(value);
    setToAmount("Click convert button to see the result");
  };
  const handleToCurrTypeChange = (value: string) => {
    setSelectedToCurrencyType(value);
    setToAmount("Click convert button to see the result");
  };

  const { apiResponse, isLoading, error } = useAxiosGet(
    `https://open.er-api.com/v6/latest/${selectedFromCurrencyType}`
  );

  useEffect(() => {
    if (apiResponse?.status === 200) {
      setCurrencyTypeOpions(Object.keys(apiResponse.data.rates));
    }
  }, [apiResponse]);
  useEffect(() => {
    error && alert(`${error}. Please try refreshing the page`);
  }, [error]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (error) {
      alert(`${error}. Please try refreshing the page`);
      return;
    }

    const amountMultiplier = apiResponse?.data.rates[
      selectedToCurrencyType
    ] as number;

    setToAmount(fromAmount * amountMultiplier);
  };

  const swapHandler = (e: any) => {
    e.preventDefault();

    setSelectedFromCurrencyType(selectedToCurrencyType);
    setSelectedToCurrencyType(selectedFromCurrencyType);

    setFromAmount(toAmount as number);
    setToAmount("Click convert button to see the result");
  };

  return (
    <>
      {/* {console.log("apiResponse: ", apiResponse)}
      {console.log("error: ", error)} */}
      <div className="bg-neutral-50 app-container">
        <div className="upper-container shadow-sm shadow-green-200">
          <Navbar />
        </div>

        <div className="lower-container">
          <div className="flex items-center p-1 sm:p-3 md:p-7 lg:p-13 page-container">
            <div className="mx-auto bg-gray-100 rounded-xl w-full max-w-xl py-10 px-1 sm:px-4 md:px-10">
              <form onSubmit={submitHandler}>
                <div>
                  <InputBox
                    label="From"
                    currencyTypeOptions={currencyTypeOptions}
                    selectedCurrencyTypeOption={selectedFromCurrencyType}
                    currencyTypeChangeHandler={handleFromCurrTypeChange}
                    amount={fromAmount}
                    amountChangeHandler={(value) => setFromAmount(value)}
                  />
                </div>

                <div className="flex justify-around mt-neg">
                  <button
                    title="swap-btn"
                    type="button"
                    disabled={isLoading}
                    className="bg-green-600 rounded-full text-white p-2 hover:bg-green-700 active:bg-green-800 disabled:cursor-not-allowed"
                    onClick={swapHandler}
                  >
                    <IoSwapVertical size={"1.5rem"} />
                  </button>
                </div>

                <div className="mt-neg">
                  <InputBox
                    isInputAmountDisabled
                    label="To"
                    currencyTypeOptions={currencyTypeOptions}
                    selectedCurrencyTypeOption={selectedToCurrencyType}
                    currencyTypeChangeHandler={handleToCurrTypeChange}
                    amount={toAmount}
                  />
                </div>

                <div className="text-red-400 text-sm min-h-20 mt-2">
                  {!isLoading && apiResponse?.data.time_last_update_utc && (
                    <div>
                      Note: Last conversion rates were calculated at:{" "}
                      {utcToLocale(apiResponse?.data.time_last_update_utc)}
                    </div>
                  )}
                  {!isLoading && apiResponse?.data.time_next_update_utc && (
                    <div>
                      Note: Conversion rates will be updated at:{" "}
                      {utcToLocale(apiResponse?.data.time_next_update_utc)}
                    </div>
                  )}
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="text-lg bg-green-600 hover:bg-green-700 p-4 rounded-md w-full text-white active:bg-green-800 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Loading..."
                      : `Convert ${selectedFromCurrencyType} to ${selectedToCurrencyType}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
