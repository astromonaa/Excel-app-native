import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { ToolBar } from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import './scss/index.scss'
import { storage, debounce } from './core/utils'
import { initialState } from './redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce((state) => {
  console.log('Hello');
  storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

new Excel('#app', {
  components: [Header, ToolBar, Formula, Table],
  store
}).render()