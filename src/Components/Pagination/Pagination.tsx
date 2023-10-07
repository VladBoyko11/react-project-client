import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import style from "../Devices/Devices.module.scss";

const Pagination: React.FC<PaginationProps> = (props) => {
    const totalPages = Math.ceil(props.totalCount / props.limit)
    const pages = [];
    if (pages.length === 0) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    }

    return <div className={'pagination d-flex justify-content-center align-items-center w-100'}>
        {pages.map((page) => (
            <span key={page} onClick={() => {
                props.onPageChanged(page);
            }}
                  className={ props.currentPage === page ? style.paginationItem : style.selectedPage }
            >
            {page}
          </span>
        ))}
    </div>
}

type mapStateToPropsType = {
    onPageChanged (page: number): void
}

const mapStateToProps = (state: RootState) => {
    return {
        limit: state.devicesPage.limit,
        currentPage: state.devicesPage.currentPage,
        totalCount: state.devicesPage.totalCount
    }
}  

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
type PaginationProps = PropsFromRedux & mapStateToPropsType 

export default connector(Pagination)