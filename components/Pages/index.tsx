import Component, { PageEl } from '@/components/Libs/Component';
import Window from '@/components/Libs/Window';
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  getProps(async()=>{
    let cart = localStorage.getItem("faves")
    if(cart)
    {
      state.faves = JSON.parse(cart)
    }
  })

  let styles = global.styles

  state.faves = Array.from(new Set(state.faves))
  let totalprice = 0;
  let count = 0;
  for (let faves of state.faves) {
    let book = props.books.find(b => b.title == faves)
    if (book) { totalprice += book.price } count = count + 1

  }

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <window title='سبد خرید'
        style={{ height: 150, width: "96%", backgroundColor: "#C1A076"  }}>
        <f-cse style={{ height: 150, width: "96%", backgroundColor: "#C1A076", margin: 15, borderRadius: 15 }}>

          <br />
          <f-cc
            style={{
              backgroundColor: "white", height: "60px", width: "30%",
              borderRadius: "8px", boxShadow: "10px 10px 5px 0px rgb(124 124 124)"
            }}>
            <img src="https://cdn.ituring.ir/research/2/money.png" style={{ height: 30, width: 35}} />
            <sp-2 />
             قیمت کل:{totalprice.toLocaleString("fa-IR")} تومان
          </f-cc>

          <br />

          <f-cc
            style={{
              backgroundColor: "white", height: "60px", width: "30%", objectFit: "contain",
              borderRadius: "8px", boxShadow: "10px 10px 5px 0px rgb(124 124 124)"
            }}>
            <img src="https://cdn.ituring.ir/research/2/count.png" style={{ height: 35, width: 35}} />
            <sp-2 />
            تعداد کتاب:{count.toLocaleString("fa-IR")}
          </f-cc>

        </f-cse></window>
      {state.form == "info" ?
        <WindowFloat title='مشخصات کتاب'
          onclose={() => {
            delete state.form
            refresh()
          }}>

          <f-c style={{ width: "100 %", textAlign: "right" }}>
            <f-15> نام کتاب:</f-15>
            <sp-3 />
            <f-15>{state.book.title}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15> نام نویسنده:</f-15>
            <sp-3 />
            <f-15>{state.book.author}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15> کشور:</f-15>
            <sp-3 />
            <f-15>{state.book.country}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15> سال:</f-15>
            <sp-3 />
            <f-15>{(state.book.year).toLocaleString("fa-IR")}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15> زبان:</f-15>
            <sp-3 />
            <f-15>{state.book.language}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15> تعداد صفحات:</f-15>
            <sp-3 />
            <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
          </f-c>

          <g-b style={{ backgroundColor: "#C1A076" }}
            onClick={() => {
              if (!state.faves) {
                state.faves = []
              }
              else{
              state.faves.push(state.book.title)
              localStorage.setItem("faves",JSON.stringify(state.faves))
              state.form = null
              }

              refresh()

            }}>
            <img src="https://cdn.ituring.ir/research/2/shop.png"
              style={{ height: 30, width: 30, objectFit: "contain" }} />
          </g-b>

        </WindowFloat> : null
      }

      <Window title="PIXEL" style={{ minHeight: 8200, margin: 10, width: "calc(100% - 33px)", backgroundSize: "cover" }}>
        <c-c style={{ height: 500, width: "100%" }}>

          <br-x />
          <br-x />

          <w-cse style={{ padding: 5 }}>
            {props.books.map(book => {
              return <Block
                book={book}
                state={state}
                refresh={refresh}
              />
            })}
          </w-cse>
        </c-c>
      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }
  console.log(books)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}