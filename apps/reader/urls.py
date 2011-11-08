from django.conf.urls.defaults import *
from apps.reader import views

urlpatterns = patterns('',
    url(r'^$', views.index),
    url(r'^login_as', views.login_as, name='login_as'),
    url(r'^logout', views.logout, name='logout'),
    url(r'^login', views.login, name='login'),
    url(r'^autologin/(?P<username>\w+)/(?P<secret>\w+)/?', views.autologin, name='autologin'),
    url(r'^signup', views.signup, name='signup'),
    url(r'^feeds/?$', views.load_feeds, name='load-feeds'),
    url(r'^feed/(?P<feed_id>\d+)', views.load_single_feed, name='load-single-feed'),
    url(r'^page/(?P<feed_id>\d+)', views.load_feed_page, name='load-feed-page'),
    url(r'^refresh_feed/(?P<feed_id>\d+)', views.refresh_feed, name='refresh-feed'),
    url(r'^favicons', views.load_feed_favicons, name='load-feed-favicons'),
    url(r'^river_stories', views.load_river_stories, name='load-river-stories'),
    url(r'^refresh_feeds', views.refresh_feeds, name='refresh-feeds'),
    url(r'^starred_stories', views.load_starred_stories, name='load-starred-stories'),
    url(r'^mark_all_as_read', views.mark_all_as_read, name='mark-all-as-read'),
    url(r'^mark_story_as_read', views.mark_story_as_read, name='mark-story-as-read'),
    url(r'^mark_feed_stories_as_read', views.mark_feed_stories_as_read, name='mark-feed-stories-as-read'),
    url(r'^mark_story_as_unread', views.mark_story_as_unread),
    url(r'^mark_story_as_starred', views.mark_story_as_starred),
    url(r'^mark_story_as_unstarred', views.mark_story_as_unstarred),
    url(r'^mark_feed_as_read', views.mark_feed_as_read),
    url(r'^delete_feed', views.delete_feed, name='delete-feed'),
    url(r'^delete_folder', views.delete_folder, name='delete-folder'),
    url(r'^rename_feed', views.rename_feed, name='rename-feed'),
    url(r'^rename_folder', views.rename_folder, name='rename-folder'),
    url(r'^add_url', views.add_url),
    url(r'^add_folder', views.add_folder),
    url(r'^add_feature', views.add_feature, name='add-feature'),
    url(r'^features', views.load_features, name='load-features'),
    url(r'^save_feed_order', views.save_feed_order, name='save-feed-order'),
    url(r'^feeds_trainer', views.feeds_trainer, name='feeds-trainer'),
    url(r'^save_feed_chooser', views.save_feed_chooser, name='save-feed-chooser'),
    url(r'^send_story_email', views.send_story_email, name='send-story-email'),
    url(r'^retrain_all_sites', views.retrain_all_sites, name='retrain-all-sites'),
    url(r'^load_tutorial', views.load_tutorial, name='load-tutorial'),
    url(r'^buster', views.iframe_buster, name='iframe-buster'),
)
