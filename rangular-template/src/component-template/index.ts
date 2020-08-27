import { Schema } from './schema';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


export const writeMethods = (element:string) => {
  const arr = element.split(";").map ((value,index) => {
    return value.replace('function',`func${index}`);
  });
  return arr.join('\n');

 /*const params = element.split(";");
 if (params[0] =="min") {
  return `this.getDataService('${params[0]}').pipe(
    ${params[1]}<any>( (a: any, b: any) => a[${params[3]}] < b[${params[3]}] ? -1 : 1)
   ).subscribe();`
 } else {
  return `this.getDataService('${params[0]}').subscribe();`
 }*/
}

export const getUrls = (urls:string) => {
  const urlArray: string[] = urls.split(";");
  return `[${urlArray}]`;
}

export function componentTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{writeMethods},
      ...{getUrls}
    })
  ]);
  /*tree.create('../../../frontend/src/rangular.ts', `public ${_options.name}(a: string) {
    return a + 'b;
  }`);*/
  
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
