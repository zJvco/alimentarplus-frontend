import theme from "../../theme"

export const muiCustomDataTableStyle = {
    margin: "20px 0",
    '.MuiDataGrid-columnHeaders': {
      border: "none",
    },
    '.MuiDataGrid-cell': {
      border: "none",
    },
    '.MuiDataGrid-row': {
    },
    '.MuiDataGrid-columnSeparator': {
        display: 'none',
    },
    '&.MuiDataGrid-root': {
        border: 'none',
    },
    '.css-wop1k0-MuiDataGrid-footerContainer': {
      border: "none"
    },
    '&.Mui-selected': {
        color: theme.colors.primary
    },
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
        color: theme.colors.primary
    },
    '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
        color: theme.colors.primary
    },
    '.css-c63i49-MuiInputBase-input-MuiInput-input': {
        border: "none"
    },
    // Tirar o outline azul quando clica em uma celula
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
        outline: "none !important",
    },
    // Colocar em negrito as colunas no header
    ".MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold"
    },
    // Tirar a borda azul na pesquisa da barra de tarefas
    ".css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
        borderBottom: `2px solid ${theme.colors.primary}`
    }
}