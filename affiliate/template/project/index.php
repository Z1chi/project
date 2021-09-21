<section class="content">
    <div class="container">
    <?php /** @var \Ufo\Model\Project $project */
    foreach ($PROJECTS as $project): ?>
        <?php echo $project->title; ?>
    <?php endforeach; ?>
    </div>

    <?php echo $PROJECTS->links(); ?>
</section>