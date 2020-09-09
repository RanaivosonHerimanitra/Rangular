import { Schema } from './schema';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


export const writeMethods = (element:string) => {
  const arr = element.split(";").map ((value,index) => {
    return value.replace('function',`func${index}`);
  });
  return arr.join('\n');
}

export const getSelectOptions = (index:number, options:string) => {
  if (options.split(";").length<=0) return '';
  return options.split(";")[index].split("-").map(val =>{
    return `'${val}'`;
  })
}

/**
 * First index is minimum
 * 2nd index is maximum
 * 3rd index is step
 */
export const getSliderOptions = (options:string) => {
  if (options ===';') return '';
  return options.split(";");
}

export const getUrls = (urls:string) => {
  const urlArray: string[] = urls.split(";");
  return `[${urlArray}]`;
}

export const getTableColumns = (columns:string) => {
  return columns.split(";").map(col => {
    return `'${col}'`
  });
}

export const handlePlotlyGraphDataSource = (view:string, viewdata:string, viewlayout:string) => {
  const data = viewdata.split(";");
  const layout = viewlayout.split(";");
  if (view  === 'plotly') {

    return `
    private x: any[] = [];
    private y: any[] = [];
    private content = { x: this.x, y: this.y, type: '${data[2]}', mode: '${data[3]}', marker: {color: '${data[4]}'} }
    graph = {
      data: [this.content],
      layout: {width:${layout[0]} , height:${layout[1]} , title:'${layout[2].split("%").join(" ")}' }
    };`;
  } else {
    return undefined;
  }
}

export function componentTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{writeMethods},
      ...{getUrls},
      ...{getSelectOptions},
      ...{getTableColumns},
      ...{getSliderOptions},
      ...{handlePlotlyGraphDataSource}
    })
  ]);
  
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
