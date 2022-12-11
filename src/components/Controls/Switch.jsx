import React, {useCallback} from 'react';
import './style/Switch.css'

const makeItems = ( variants, active, clickHandler ) => {
    const optionList = [];
    for ( let variantKey in variants ) {
        const classList = ['variant'];
        if ( variantKey === active ) {
            classList.push('active');
        }

        optionList.push((
            <span key={`lang-key-${variantKey}`}
                 onClick={clickHandler ? (e) => clickHandler(e, variantKey) : null}
                 className={classList.join(' ')}
            >
                { variants[variantKey] }
            </span>
        ));
    }

    return optionList;
};

/**
 *
 *
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 */
const Switch = props => {
    const onClickHandler = useCallback(
        ( event, variantKey ) => {
            event.preventDefault();
            if ( props.onChange ) {
                props.onChange(variantKey);
            }
        },
        [ props.onChange ]
    );

    if ( !props.variants ) {
        return null;
    }

    if ( Array.isArray(props.variants) ) {
        return null;
    }

    const active = props.active || Object.keys(props.variants)[0] || null;

    const classList = ["base-switch", props.className];

    return (
        <div className={classList.join(' ')}>
            <div className="base-switch-variants">
                { makeItems(props.variants, active, onClickHandler) }
            </div>

            { React.Children.toArray(props.children) }
        </div>
    );
};

export default Switch;
