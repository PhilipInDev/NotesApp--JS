import {columnNames, columnNamesStatistic, mainTableBox, statisticTableBox} from "./constants";
import {RenderTableHeader} from "./renderTableHeader";


mainTableBox.prepend(RenderTableHeader(columnNames, true));
statisticTableBox.prepend(RenderTableHeader(columnNamesStatistic));