import { Range, getTrackBackground } from "react-range";

const PriceRange = ({ minMaxPrice, setMinMaxPrice }) => {
  return (
    <Range
      step={5}
      min={0}
      max={500}
      values={minMaxPrice}
      onFinalChange={(newValues) => setMinMaxPrice(newValues)}
      onChange={(newValues) => setMinMaxPrice(newValues)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "5px",
            width: "100%",
            background: getTrackBackground({
              values: minMaxPrice,
              colors: ["#ccc", "#2CB1BA", "#ccc"],
              min: 0,
              max: 500,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props, value }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            backgroundColor: "#2CB1BA",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white",
            outline: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-28px",
              color: "#fff",
              fontSize: "14px",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#2CB1BA",
            }}
          >
            {value}€
          </div>
        </div>
      )}
    />
  );
};

export default PriceRange;
