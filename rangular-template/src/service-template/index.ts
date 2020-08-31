import { Schema } from './schema';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export const getEndPoints = (endpoints: string) => {
  return endpoints.split(";").map(endpoint => {
    return `"${endpoint}"`;
  });
}

/*export const getServiceMethods = (endpoints: string) => {
  const arr = endpoints.split(";").map((_, index) => {
    return `getDataService${index}(path: string): Observable<any> {
      return this.http.get<any>(BASE_ENDPOINT + "/" + path);
    }`;
  })
  return arr.join('\n\n');
}*/

export const getServiceMethod = () => {
    return `getDataService(path: string): Observable<any> {
      return this.http.get<any>(BASE_ENDPOINT + "/" + path);
    }`;
}

export function serviceTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{getEndPoints},
      ...{getServiceMethod}
    })
  ]);
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
