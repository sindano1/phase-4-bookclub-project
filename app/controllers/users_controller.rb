class UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    # TO DO: remove index from the skip_before_action
    skip_before_action :authorize, only: [:create, :show, :index]

    def index
        render json: User.all
    end

    def show
            render json: @user
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
