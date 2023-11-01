export const TypeBadge = ( { type, spType } ) => {

    return (
        <span className = { `typeBtn ${ type }` } >
            { spType }
        </span>
      )
    }