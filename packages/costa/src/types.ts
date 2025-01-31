import { ParsedUrlQuery } from 'querystring';

/**
 * enum of script type
 */
export enum ScriptType { DataSource, Dataflow, Model }

/**
 * pipcook script stucture
 */
export interface PipcookScript {
  // script name
  name: string;
  // script path in the file system
  path: string;
  // script type
  type: ScriptType;
  // script query
  query: ParsedUrlQuery;
}

/**
 * enum type of framework package:
 *   Python: python package which can be used through `boa.import`
 *   JS: js module which can be used through `import`
 */
export enum PackageType { Python = 'python', JS = 'js' }

/**
 * package structure in pipcook framework
 */
/**
 * pipcook framework description struct
 */
export interface PipcookFramework {
  // the location of the framework
  path: string;
  // framework name
  name: string;
  // description of the framework
  desc: string | null;
  // framework version
  version: string;
  // arch of current machine: x86 x64 etc. Ignore check if null
  arch: string | null;
  // os: darwin, win32, linux etc. Ignore check if null
  platform: string | null;
  // node version: see https://www.npmjs.com/package/semver. Ignore check if null
  nodeVersion: string | null;
  // n-api version
  napiVersion: number | null;
  // python runtime version, the python packages run on boa.
  pythonVersion: string | null;
  // python site-packages path in the directory, 'site-packages' by default.
  pythonPackagePath: string | null;
  // js node modules path in the directory, 'node_modules' by default.
  jsPackagePath: string | null;
}

/**
 * the struct which defines the scripts in a pipeline,
 *   datasource: the script use to fetch the data
 *   dataflow: some scripts use to process the data,
 *   model: define, train and evaluate model
 */
export interface ScriptConfig {
  dataSource: PipcookScript | null;
  dataflow: Array<PipcookScript> | null;
  model: PipcookScript;
}

/**
 * Artifact configuration, `processor` is the name and version of the artifact plugin,
 * like `pipcook-ali-oss-uploader@0.0.1`. The others are the options which will be
 * passed into the plugin.
 */
export interface Artifact {
  processor: string;
  [k: string]: any;
}

/**
 * pipeline configuration stucture
 */
export interface PipelineMeta {
  // pipeline version, '2.0' by default
  specVersion: string;
  // data source script url or sql
  dataSource: string;
  // data process script, set to null if not used
  dataflow: Array<string> | null;
  // model script url
  model: string;
  // artifact plugins and options
  artifacts: Array<Artifact>;
  // pipeline options
  options: Record<string, any>;
}
