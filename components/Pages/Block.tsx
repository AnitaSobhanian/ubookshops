export const Block = props => {

    if (!props.state.faves) {
        props.state.faves = []
    }


    return <c-x
        onClick={() => {
            props.state.form = "info"
            props.state.book = props.book
            props.refresh()
        }}
        style={{
            height: 300, width: 190, borderRadius: 15,
            boxShadow: "10px 10px 5px 0px rgb(124 124 124)",
            backgroundColor: "white", display: "flex", marginBottom: "25px"
        }}>

        <img
            className={global.styles.hoverzoom_light_nofade}
            src={props.book.imageLink}
            style={{
                height: 200, width: 190, flex: 1, minWidth: 150,
                position: "relative", objectFit: "fill",
                borderTopLeftRadius: 15, borderTopRightRadius: 15
            }} />


        <f-cc style={{ 
            width: "100 %", textAlign: "center", fontWeight: "bold" 
            }}>
            <f-13>{props.book.title}</f-13>
        </f-cc>


        <f-csb style={{ 
            width: "100%", direction: "rtl"
            }}>

            {props.state.faves.includes(props.book.title) ? (

                <img src="https://cdn.ituring.ir/research/2/check.png"
                    style={{
                        width: 35, height: 35, objectFit: "contain", marginRight: 5, marginBottom: 8
                    }} />)

                : (<img src="https://cdn.ituring.ir/research/2/shop.png"
                    style={{
                        width: 35, height: 35, objectFit: "contain", marginRight: 5, marginBottom: 8
                    }} />)}

            <c-cc style={{ width: "100 %", marginLeft: "5px" }}>
                <del 
                style={{ color: "red" }}>
                    {(1.5 * props.book.price).toLocaleString("fa-IR")}تومان
                </del>
                <f-13b 
                style={{ color: "green" }}>
                    {(props.book.price).toLocaleString("fa-IR")}تومان
                </f-13b>
            </c-cc>
        </f-csb>
    </c-x>
}