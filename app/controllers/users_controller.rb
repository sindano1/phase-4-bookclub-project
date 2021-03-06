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

    def store_books
    
        # Check if book instance exists and if the key matches another
        book = Book.find_by(key: params[:key])
        if book && params[:key] == Book.find_by(key: params[:key]).key && book.key != nil
            # Create a read instance using the original book
            new_read = Read.create!(user_id: session[:user_id], book_id: book.id)
        else
            # Create a new book and a new read instance of that book
            new_book = Book.create!(book_params)
            new_read = Read.create!(user_id: session[:user_id], book_id: new_book.id)
        end
        render json: new_read.book    
    end

    def show_library
        currentUser = User.find(session[:user_id])
        render json: currentUser.books
    end

    def your_clubs
        your_clubs = User.find_by(id: session[:user_id]).clubs
        render json: your_clubs
    end

    def book_status
        # find the logged in user
        currentUser = User.find(session[:user_id])
        # get their books
        specific_reads = currentUser.books
        # return the reads
        .map{|b| b.reads}.flatten
        # filter each read for the specific user
        .filter_map{ |read| read if read.user_id == session[:user_id] }
        render json: specific_reads
    end
    
private

    def find_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :birthday, :new_username, :new_password)
    #can a user assign their own default club id?
    end

    def book_params
        params.permit(:title, :author, :image, :genre, :key)
    end
end
