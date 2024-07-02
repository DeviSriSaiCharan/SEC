export const themeSettings=(mode)=>{
    return {
   palette:{
    mode:mode,
    ...(mode==="dark"?{
        
        background:{
            main:"#080808"
        },
        blue:{
            main:"#116dff"
        },
        white:{
            main:"#FFFFFF"
        }
    }:{
   
        background:{
            main:"#C9C9C9"
        },
        blue:{
            main:"#116dff"
        },
        white:{
            main:"#FFFFFF"
        }
    })
   },   
    typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
    }
}
}