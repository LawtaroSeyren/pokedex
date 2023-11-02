export const StatsBar = ({ stats, fill }) => {

    return (
        <div className="stats-container">
            { stats.map(( stat ) => {
                const percentage = ( stat.base_stat / 255 ) * 100;

                return (
                    <div key={ stat.stat.name } className="stat-bar">
                        <p className="stat-name">{ stat.stat.name.toUpperCase()}:</p>
                        <div className="stat-progress">
                            <div className={`stat-fill ${ fill }`} style={{ width: `${ percentage }%` }} ></div>
                        </div>
                        <div className="stat-number">{ stat.base_stat }</div>
                    </div>
                );
            })}
        </div>
    )
}
