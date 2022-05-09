class UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    skip_before_action :authorize, only: [:create, :show]

    def index
        render json: User.all
    end

    def show
        if params[:id]
            render json: @user
        end
        
        # TODO: why can I not enter byebug from /auth
        # TODO: why am I getting "user not found" error when user is logged in
        # byebug
        # current_user = User.find(session[:user_id])
        # if current_user
        #     render json: current_user
        # else
        #     render json: { error: "No user logged in" }, status: :unauthorized
        # end
    end

    def create
        user = User.create!(user_params)
        # login after creation
        session[:user_id] =  user.id
        render json: user, status: :created
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end
   
    def destroy
        @user.destroy
        head :no_content
   # double check this one -> render json: {}, status :accepted
    end

private

    def find_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :birthday)
    #can a user assign their own default club id?
    end
end
