import styles from "./RangeIndicator.module.css";

interface RangeIndicatorProps {
  current: number;
  low: number;
  high: number;
}
const RangeIndicator: React.FC<RangeIndicatorProps> = ({
  current,
  low,
  high,
}) => {
  return (
    <>
      <div className={styles.dayRangeBar}>
        <div
          className={styles.indicator}
          style={{
            marginLeft: `${((current - low) / (high - low)) * 100}%`,
          }}
        />
      </div>
      <div className={styles.dayRange}>
        <span>{low}</span>
        <p>24h Range</p>
        <span>{high}</span>
      </div>
    </>
  );
};

export default RangeIndicator;
