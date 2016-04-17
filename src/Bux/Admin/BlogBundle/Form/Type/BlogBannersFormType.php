<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/18/14
 * Time: 11:58 AM
 */

namespace Bux\Admin\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class BlogBannersFormType
 *
 * @package Bux\Admin\BlogBundle\Form\Type
 */
class BlogBannersFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('bannerSideFile', 'file', array(
                'required'  => false,
            ))
            ->add('bannerSideLink', 'text', array(
                'required'  => false,
            ))
            ->add('bannerBottomFile', 'file', array(
                'required'  => false,
            ))
            ->add('bannerBottomLink', 'text', array(
                'required'  => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\BlogBundle\Entity\BlogSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'blog_banners_form_type';
    }
}