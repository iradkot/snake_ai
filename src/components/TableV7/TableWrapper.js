import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledTableContainer, StyledTableWrapper } from './styles';
import PaginationBar from './PaginationBar';
import { paginationObjectPropTypes } from './types';
import useDimensions from "../../hooks/useDimensions";

const NeoUiTable = ({
                        withPagination,
                        paginationObject,
                        loading,
                        mouseState,
                        setMouseState,
                        tableWrapperStyle,
                        stickyHeader,
                        children,
                    }) => {
    const divRef = useRef();
    const wrapperSize = useDimensions(divRef);
    return (
        <>
            <div ref={divRef} style={ { position: 'sticky', width: '100%', display: 'contents' } }/>
            <StyledTableWrapper
                wrapperSize={wrapperSize}
                style={ tableWrapperStyle }
                onMouseLeave={ () => {
                    if ( mouseState === 'down' ) setMouseState('leave');
                } }
                onMouseUp={ () => {
                    if ( mouseState === 'down' ) setMouseState('up');
                } }
            >
                {/*<BackdropOverlay active={loading || mouseState === 'down'}>*/ }
                {/*  {mouseState === 'down' && 'Calculating resize'}*/ }
                {/*</BackdropOverlay>*/ }
                <StyledTableContainer stickyHeader={stickyHeader}>{ children }</StyledTableContainer>
                { withPagination && <PaginationBar disabled={ loading } paginationObject={ paginationObject }/> }
            </StyledTableWrapper>
        </>
    );
};

NeoUiTable.propTypes = {
    withPagination: PropTypes.bool,
    tableWrapperStyle: PropTypes.object,
    paginationObject: paginationObjectPropTypes,
    loading: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    mouseState: PropTypes.string,
    setMouseState: PropTypes.func,
    children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]).isRequired,
};

export default NeoUiTable;
