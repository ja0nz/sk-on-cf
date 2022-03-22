{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.yarn
    nodePackages.svelte-language-server
    nodePackages.vscode-json-languageserver
    nodePackages.svelte-check
    nodePackages.prettier
    nodePackages.eslint
  ];
}
