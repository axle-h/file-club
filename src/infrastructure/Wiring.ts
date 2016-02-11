import { TypeBinding, Kernel, TypeBindingScopeEnum } from "inversify";
import { MovieService, IMovieService } from "../services/MovieService"
import { MovieFileRepository, IMovieFileRepository } from "../repositories/MovieFileRepository"
import { MovieRepository, IMovieRepository } from "../repositories/MovieRepository"
import { Config, IConfig } from "../config/Config"

export enum Binding {
    IMovieFileRepository,
    IMovieRepository,
    IMovieService,
    IConfig
}

export interface IWiring {
    Resolve<T>(binding: Binding): T;
    
    GetBindingName(binding: Binding): string;
}

class Wiring implements IWiring {
    private kernel: Kernel;
    
    constructor() {
        this.kernel = new Kernel();
        
        // bind
        this.kernel.bind(new TypeBinding<IConfig>(Binding[Binding.IConfig], Config, TypeBindingScopeEnum.Transient));
        this.kernel.bind(new TypeBinding<IMovieService>(Binding[Binding.IMovieService], MovieService, TypeBindingScopeEnum.Transient));
        this.kernel.bind(new TypeBinding<IMovieFileRepository>(Binding[Binding.IMovieFileRepository], MovieFileRepository, TypeBindingScopeEnum.Transient));
        this.kernel.bind(new TypeBinding<IMovieRepository>(Binding[Binding.IMovieRepository], MovieRepository, TypeBindingScopeEnum.Transient));
    }
    
    public Resolve<T>(binding: Binding): T {
        var name = this.GetBindingName(binding);
        return this.kernel.resolve<T>(name);
    }
    
    public GetBindingName(binding: Binding) {
        return Binding[binding];
    }
}

export var wiring: IWiring = new Wiring();