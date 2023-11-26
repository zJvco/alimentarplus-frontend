import React from 'react'
import { GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid'
import Button from '../../Form/Button'
import { FaPlus } from 'react-icons/fa6'

function MUICustomToolBar(props) {
  return (
    <GridToolbarContainer style={{ display: "flex", width: "100%", justifyContent: "end", padding: "12px 0", flexWrap: "nowrap" }}>
      <GridToolbarQuickFilter style={{ width: "100%" }} />
      <br/>
      <GridToolbarExport />
      <br/>
      { props.hasAddNewProductButton && (
        <Button style={{ width: "auto" }} onClick={() => props.setIsOpenCreateNewProdutoPopup(!props.isOpenCreateNewProdutoPopup)}>
          <FaPlus style={{ marginRight: "8px" }} />
          ADICIONAR
        </Button>
      ) }
    </GridToolbarContainer>
  )
}

export default MUICustomToolBar